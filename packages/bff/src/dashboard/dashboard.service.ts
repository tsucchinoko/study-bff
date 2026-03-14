import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { OpenWeatherMapService } from '../external-api/openweathermap.service';
import { AirQualityService } from '../external-api/air-quality.service';
import { LocalNewsService } from '../external-api/news.service';
import {
  OWMCurrentResponse,
  OWMForecastResponse,
} from '../external-api/openweathermap.interface';
import { AirQualityResponse } from '../external-api/air-quality.interface';
import { LocalNewsResponse } from '../external-api/news.interface';
import type {
  WebDashboardResponse,
  MobileDashboardResponse,
  DailyForecast,
} from '@study-bff/shared';

/** 3時間毎の予報データをWeb向け形式に変換 */
const toHourlyForecast = (item: OWMForecastResponse['list'][number]) => ({
  dateTime: item.dt_txt,
  temperature: item.main.temp,
  feelsLike: item.main.feels_like,
  humidity: item.main.humidity,
  description: item.weather[0].description,
  icon: item.weather[0].icon,
  windSpeed: item.wind.speed,
  pop: item.pop,
});

/** 温度を小数第1位に丸める */
const roundTemp = (temp: number): number => Math.round(temp * 10) / 10;

/** キャッシュされる生データ（3つのサービスの結果をまとめて保存） */
interface RawDashboardData {
  weather: {
    current: OWMCurrentResponse;
    forecast: OWMForecastResponse;
  };
  airQuality: AirQualityResponse | null;
  news: LocalNewsResponse | null;
  cachedAt: string;
  serviceStatus: {
    weather: 'ok' | 'error';
    airQuality: 'ok' | 'error';
    news: 'ok' | 'error';
  };
}

/**
 * DashboardService - BFFパターンの真価を発揮するサービス
 *
 * 3つの独立したマイクロサービスを集約し、クライアントごとに最適化する:
 *
 * 1. APIアグリゲーション
 *    → 3つのサービス (天気 + 大気品質 + ニュース) を並列呼び出し
 *    → クライアントは1回のリクエストで全データを取得できる
 *
 * 2. 部分的フォールバック（Partial Degradation）
 *    → 天気APIは必須だが、大気品質やニュースが落ちても天気データだけ返す
 *    → バックエンド単体だと「全部成功 or エラー」になりがち
 *
 * 3. レスポンス最適化
 *    → Web: 全データをリッチに表示
 *    → Mobile: 必要最小限のデータに圧縮（通信量削減）
 *
 * 4. キャッシュ共有
 *    → 生データを1つのキャッシュに保存し、Web/Mobile両方で再利用
 */
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly owmService: OpenWeatherMapService,
    private readonly airQualityService: AirQualityService,
    private readonly newsService: LocalNewsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * Web向けダッシュボード
   *
   * 全データをリッチに返す（天気詳細 + 汚染物質内訳 + ニュース全文）
   */
  async getForWeb(city: string): Promise<WebDashboardResponse> {
    const raw = await this.getRawData(city);
    const { main, wind, weather, visibility, clouds, sys } =
      raw.weather.current;

    return {
      city: raw.weather.current.name,
      country: sys.country,
      weather: {
        current: {
          temperature: main.temp,
          feelsLike: main.feels_like,
          humidity: main.humidity,
          pressure: main.pressure,
          windSpeed: wind.speed,
          windDirection: wind.deg,
          description: weather[0].description,
          icon: weather[0].icon,
          visibility,
          clouds: clouds.all,
          sunrise: new Date(sys.sunrise * 1000).toISOString(),
          sunset: new Date(sys.sunset * 1000).toISOString(),
        },
        forecast: raw.weather.forecast.list.map(toHourlyForecast),
      },
      // 大気品質: 取得できた場合は全データを返す、できなかった場合は null
      airQuality: raw.airQuality
        ? {
            aqi: raw.airQuality.aqi,
            label: raw.airQuality.label,
            components: raw.airQuality.components,
            healthAdvice: raw.airQuality.healthAdvice,
          }
        : null,
      // ニュース: 取得できた場合は全記事を返す
      news: raw.news
        ? raw.news.articles.map((article) => ({
            id: article.id,
            title: article.title,
            summary: article.summary,
            category: article.category,
            publishedAt: article.publishedAt,
            url: article.url,
          }))
        : [],
      meta: {
        cachedAt: raw.cachedAt,
        source: 'BFF Dashboard (Weather + AirQuality + News)',
        services: raw.serviceStatus,
      },
    };
  }

  /**
   * モバイル向けダッシュボード
   *
   * 最小限のデータに圧縮:
   * - 天気: 3項目 + 日別予報5日分
   * - 大気品質: AQI数値のみ（汚染物質の内訳は省略）
   * - ニュース: 最新3件のタイトルのみ（本文・URLは省略）
   */
  async getForMobile(city: string): Promise<MobileDashboardResponse> {
    const raw = await this.getRawData(city);

    return {
      city: raw.weather.current.name,
      weather: {
        current: {
          temperature: raw.weather.current.main.temp,
          description: raw.weather.current.weather[0].description,
          icon: raw.weather.current.weather[0].icon,
        },
        dailyForecast: this.aggregateToDailyForecast(raw.weather.forecast),
      },
      // 大気品質: AQIとラベルのみ（componentsは送らない → 通信量削減）
      airQuality: raw.airQuality
        ? {
            aqi: raw.airQuality.aqi,
            label: raw.airQuality.label,
            healthAdvice: raw.airQuality.healthAdvice,
          }
        : null,
      // ニュース: 最新3件のタイトルのみ（summary, url は省略 → 通信量削減）
      news: raw.news
        ? raw.news.articles.slice(0, 3).map((article) => ({
            id: article.id,
            title: article.title,
            category: article.category,
          }))
        : [],
    };
  }

  /**
   * 3つのサービスを並列呼び出しし、生データをキャッシュ
   *
   * ★ BFFの核心ロジック ★
   *
   * Promise.allSettled を使うことで:
   * - 天気APIが成功 → 大気品質が失敗 → ニュースが成功
   * という「部分的成功」のケースでも、取得できたデータだけ返せる
   *
   * これがBFFなしだと:
   * - フロントエンドが3回APIを叩く → 1つ失敗するとUIが壊れやすい
   * - バックエンドで集約 → 全サービス成功を前提にしがち
   */
  private async getRawData(city: string): Promise<RawDashboardData> {
    const cacheKey = `dashboard:${city.toLowerCase()}`;

    const cached = await this.cacheManager.get<RawDashboardData>(cacheKey);
    if (cached) {
      this.logger.log(`Cache hit for dashboard:${city}`);
      return cached;
    }

    this.logger.log(
      `Cache miss for dashboard:${city} — calling 3 services in parallel`,
    );

    // ★ 3つのサービスを並列呼び出し（Promise.allSettled で部分的障害に対応）
    const [weatherResult, airQualityResult, newsResult] =
      await Promise.allSettled([
        // 天気: 2つのAPI呼び出しをさらに並列化
        Promise.all([
          this.owmService.getCurrentWeather(city),
          this.owmService.getForecast(city),
        ]),
        this.airQualityService.getAirQuality(city),
        this.newsService.getLocalNews(city),
      ]);

    // 天気データは必須 — 失敗したら即エラー
    if (weatherResult.status === 'rejected') {
      throw weatherResult.reason;
    }

    // 大気品質・ニュースは失敗しても null で続行（部分的フォールバック）
    const airQuality =
      airQualityResult.status === 'fulfilled'
        ? airQualityResult.value
        : this.logServiceFailure('AirQuality', airQualityResult.reason);

    const news =
      newsResult.status === 'fulfilled'
        ? newsResult.value
        : this.logServiceFailure('News', newsResult.reason);

    const rawData: RawDashboardData = {
      weather: {
        current: weatherResult.value[0],
        forecast: weatherResult.value[1],
      },
      airQuality,
      news,
      cachedAt: new Date().toISOString(),
      serviceStatus: {
        weather: 'ok',
        airQuality: airQualityResult.status === 'fulfilled' ? 'ok' : 'error',
        news: newsResult.status === 'fulfilled' ? 'ok' : 'error',
      },
    };

    await this.cacheManager.set(cacheKey, rawData);

    return rawData;
  }

  /** サービス障害をログに記録し、null を返す */
  private logServiceFailure(serviceName: string, error: unknown): null {
    this.logger.warn(
      `${serviceName} service failed, returning partial response: ${error}`,
    );
    return null;
  }

  /** 3時間毎の予報 → 日別予報に集約 */
  private aggregateToDailyForecast(
    forecast: OWMForecastResponse,
  ): DailyForecast[] {
    const dailyMap = forecast.list.reduce(
      (map, item) => {
        const date = item.dt_txt.split(' ')[0];
        const existing = map.get(date);

        return map.set(date, {
          temps: [...(existing?.temps ?? []), item.main.temp],
          description: existing?.description ?? item.weather[0].description,
          icon: existing?.icon ?? item.weather[0].icon,
        });
      },
      new Map<
        string,
        { temps: number[]; description: string; icon: string }
      >(),
    );

    return Array.from(dailyMap, ([date, data]) => ({
      date,
      high: roundTemp(Math.max(...data.temps)),
      low: roundTemp(Math.min(...data.temps)),
      description: data.description,
      icon: data.icon,
    })).slice(0, 5);
  }
}

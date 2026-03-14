import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { OpenWeatherMapService } from '../external-api/openweathermap.service';
import {
  OWMCurrentResponse,
  OWMForecastResponse,
} from '../external-api/openweathermap.interface';
import type { WebWeatherResponse } from '@study-bff/shared';
import type { MobileWeatherResponse, DailyForecast } from '@study-bff/shared';

/** キャッシュされる生データ */
interface RawWeatherData {
  current: OWMCurrentResponse;
  forecast: OWMForecastResponse;
  cachedAt: string;
}

/**
 * WeatherService - BFFの心臓部
 *
 * このサービスがBFFパターンの3つの主要な役割を担う:
 *
 * 1. APIアグリゲーション
 *    → 2つの外部API (現在天気 + 5日予報) を並列呼び出しし、1つにまとめる
 *
 * 2. レスポンス最適化
 *    → 同じ生データから、Web向け(詳細)とモバイル向け(簡易)に変換する
 *
 * 3. キャッシュ
 *    → 生データをキャッシュし、Web/Mobile両方で共有する
 */
@Injectable()
export class WeatherService {
  constructor(
    private readonly owmService: OpenWeatherMapService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * Web向け: 詳細な天気データを返す
   */
  async getForWeb(city: string): Promise<WebWeatherResponse> {
    const raw = await this.getRawData(city);

    return {
      city: raw.current.name,
      country: raw.current.sys.country,
      current: {
        temperature: raw.current.main.temp,
        feelsLike: raw.current.main.feels_like,
        humidity: raw.current.main.humidity,
        pressure: raw.current.main.pressure,
        windSpeed: raw.current.wind.speed,
        windDirection: raw.current.wind.deg,
        description: raw.current.weather[0].description,
        icon: raw.current.weather[0].icon,
        visibility: raw.current.visibility,
        clouds: raw.current.clouds.all,
        sunrise: new Date(raw.current.sys.sunrise * 1000).toISOString(),
        sunset: new Date(raw.current.sys.sunset * 1000).toISOString(),
      },
      // 3時間毎の予報をそのまま返す
      forecast: raw.forecast.list.map((item) => ({
        dateTime: item.dt_txt,
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        pop: item.pop,
      })),
      meta: {
        cachedAt: raw.cachedAt,
        source: 'OpenWeatherMap',
      },
    };
  }

  /**
   * モバイル向け: 簡易な天気データを返す
   *
   * Web版との違い:
   * - 現在天気は3項目のみ (気温、天気、アイコン)
   * - 予報は3時間毎ではなく日別に集約 (最高/最低気温)
   * - countryやmeta情報は省略
   */
  async getForMobile(city: string): Promise<MobileWeatherResponse> {
    const raw = await this.getRawData(city);

    return {
      city: raw.current.name,
      current: {
        temperature: raw.current.main.temp,
        description: raw.current.weather[0].description,
        icon: raw.current.weather[0].icon,
      },
      // 3時間毎の予報を日別に集約
      dailyForecast: this.aggregateToDailyForecast(raw.forecast),
    };
  }

  /**
   * 生データの取得 (キャッシュ付き)
   *
   * ポイント: 生データをキャッシュすることで、
   * Web/Mobileどちらのリクエストでもキャッシュが効く
   */
  private async getRawData(city: string): Promise<RawWeatherData> {
    const cacheKey = `weather:${city.toLowerCase()}`;

    // キャッシュ確認
    const cached = await this.cacheManager.get<RawWeatherData>(cacheKey);
    if (cached) {
      return cached;
    }

    // キャッシュミス → 外部APIを並列呼び出し（アグリゲーション）
    const [current, forecast] = await Promise.all([
      this.owmService.getCurrentWeather(city),
      this.owmService.getForecast(city),
    ]);

    const rawData: RawWeatherData = {
      current,
      forecast,
      cachedAt: new Date().toISOString(),
    };

    // キャッシュに保存
    await this.cacheManager.set(cacheKey, rawData);

    return rawData;
  }

  /**
   * 3時間毎の予報 → 日別予報に集約
   *
   * モバイル向けのレスポンス最適化の具体例:
   * 40件の3時間毎データ → 5件の日別データに圧縮
   */
  private aggregateToDailyForecast(
    forecast: OWMForecastResponse,
  ): DailyForecast[] {
    const dailyMap = new Map<
      string,
      { temps: number[]; description: string; icon: string }
    >();

    for (const item of forecast.list) {
      const date = item.dt_txt.split(' ')[0]; // "2026-03-15"

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          temps: [],
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        });
      }

      dailyMap.get(date)!.temps.push(item.main.temp);
    }

    const result: DailyForecast[] = [];
    for (const [date, data] of dailyMap) {
      result.push({
        date,
        high: Math.round(Math.max(...data.temps) * 10) / 10,
        low: Math.round(Math.min(...data.temps) * 10) / 10,
        description: data.description,
        icon: data.icon,
      });
    }

    return result.slice(0, 5); // 最大5日分
  }
}

import { CurrentWeatherDetail, ForecastItem } from './weather';
import { CurrentWeatherSimple, DailyForecast } from './weather';
import { AirQualityDetail, AirQualitySimple } from './air-quality';
import { NewsArticleDetail, NewsArticleSimple } from './news';

/**
 * Web向けダッシュボード レスポンス
 *
 * BFFが3つのマイクロサービスを集約し、Webに最適化した形で返す:
 * - 天気: 全詳細データ + 3時間毎の予報
 * - 大気品質: 各汚染物質の濃度まで表示
 * - ニュース: 全記事の本文・URL付き
 *
 * BFFなしの場合、フロントエンドが3回APIを叩く必要がある
 */
export interface WebDashboardResponse {
  city: string;
  country: string;
  weather: {
    current: CurrentWeatherDetail;
    forecast: ForecastItem[];
  };
  airQuality: AirQualityDetail | null;
  news: NewsArticleDetail[];
  meta: {
    cachedAt: string;
    source: string;
    /** どのサービスが利用可能だったか */
    services: {
      weather: 'ok' | 'error';
      airQuality: 'ok' | 'error';
      news: 'ok' | 'error';
    };
  };
}

/**
 * モバイル向けダッシュボード レスポンス
 *
 * 同じ3つのマイクロサービスから、モバイルに最適化した軽量データを返す:
 * - 天気: 3項目のみ + 日別予報（5日分）
 * - 大気品質: AQI数値とラベルのみ（汚染物質の内訳は省略）
 * - ニュース: 最新3件のタイトルのみ（本文・URLは省略）
 *
 * Web版と比較すると、レスポンスサイズが大幅に小さい
 */
export interface MobileDashboardResponse {
  city: string;
  weather: {
    current: CurrentWeatherSimple;
    dailyForecast: DailyForecast[];
  };
  airQuality: AirQualitySimple | null;
  news: NewsArticleSimple[];
}

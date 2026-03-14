import { CurrentWeatherSimple, DailyForecast } from './weather';

/** モバイル向けBFFレスポンス（簡易データ） */
export interface MobileWeatherResponse {
  city: string;
  current: CurrentWeatherSimple;
  dailyForecast: DailyForecast[];
}

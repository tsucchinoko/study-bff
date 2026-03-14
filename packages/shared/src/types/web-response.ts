import { CurrentWeatherDetail, ForecastItem } from './weather';

/** Web向けBFFレスポンス（詳細データ） */
export interface WebWeatherResponse {
  city: string;
  country: string;
  current: CurrentWeatherDetail;
  forecast: ForecastItem[];
  meta: {
    cachedAt: string | null;
    source: string;
  };
}

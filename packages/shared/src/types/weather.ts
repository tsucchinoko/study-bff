/** 現在の天気情報（Web向け・詳細） */
export interface CurrentWeatherDetail {
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  icon: string;
  visibility: number;
  clouds: number;
  sunrise: string;
  sunset: string;
}

/** 現在の天気情報（モバイル向け・簡易） */
export interface CurrentWeatherSimple {
  temperature: number;
  description: string;
  icon: string;
}

/** 3時間毎の予報（Web向け） */
export interface ForecastItem {
  dateTime: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  pop: number;
}

/** 日別予報（モバイル向け） */
export interface DailyForecast {
  date: string;
  high: number;
  low: number;
  description: string;
  icon: string;
}

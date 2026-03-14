/**
 * OpenWeatherMap API のレスポンス型定義
 * https://openweathermap.org/current
 * https://openweathermap.org/forecast5
 */

export interface OWMCurrentResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  visibility: number;
  clouds: {
    all: number;
  };
}

export interface OWMForecastResponse {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    pop: number;
  }>;
}

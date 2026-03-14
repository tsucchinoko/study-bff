/** 大気品質情報（Web向け・詳細） */
export interface AirQualityDetail {
  aqi: number;
  label: string;
  components: {
    pm2_5: number;
    pm10: number;
    no2: number;
    o3: number;
    co: number;
  };
  healthAdvice: string;
}

/** 大気品質情報（モバイル向け・簡易） */
export interface AirQualitySimple {
  aqi: number;
  label: string;
  healthAdvice: string;
}

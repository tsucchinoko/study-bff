/**
 * 大気品質 API のレスポンス型定義
 *
 * 実際のプロダクトでは別チームが管理する大気品質マイクロサービスを想定
 * （ここではモックデータで擬似的に再現）
 */

export interface AirQualityResponse {
  /** AQI (Air Quality Index): 1-5 (1=Good, 5=Very Poor) */
  aqi: number;
  /** AQIのラベル */
  label: string;
  /** 各汚染物質の濃度 (μg/m³) */
  components: {
    pm2_5: number;
    pm10: number;
    no2: number;
    o3: number;
    co: number;
  };
  /** 健康へのアドバイス */
  healthAdvice: string;
}

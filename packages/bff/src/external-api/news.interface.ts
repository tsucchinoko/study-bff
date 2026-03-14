/**
 * ニュース/観光スポット API のレスポンス型定義
 *
 * 実際のプロダクトでは別チームが管理するコンテンツマイクロサービスを想定
 * （ここではモックデータで擬似的に再現）
 */

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: 'weather_alert' | 'local_event' | 'tourism';
  publishedAt: string;
  url: string;
}

export interface LocalNewsResponse {
  city: string;
  articles: NewsArticle[];
}

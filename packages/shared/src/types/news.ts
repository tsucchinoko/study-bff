/** ニュース記事（Web向け・全情報） */
export interface NewsArticleDetail {
  id: string;
  title: string;
  summary: string;
  category: 'weather_alert' | 'local_event' | 'tourism';
  publishedAt: string;
  url: string;
}

/** ニュース記事（モバイル向け・タイトルのみ） */
export interface NewsArticleSimple {
  id: string;
  title: string;
  category: 'weather_alert' | 'local_event' | 'tourism';
}

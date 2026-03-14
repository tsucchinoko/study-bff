import { Injectable, Logger } from '@nestjs/common';
import { LocalNewsResponse, NewsArticle } from './news.interface';

/**
 * ニュース/観光スポット マイクロサービス（擬似）
 *
 * 実際のプロダクトでは:
 * - コンテンツチームが管理するCMS API
 * - 社内の観光情報データベース
 * などが想定される
 *
 * ここではモックデータ + ランダム遅延 + 一定確率の障害で再現
 */
@Injectable()
export class LocalNewsService {
  private readonly logger = new Logger(LocalNewsService.name);

  /** 障害発生確率 (15%) */
  private readonly failureRate = 0.15;

  async getLocalNews(city: string): Promise<LocalNewsResponse> {
    // 擬似的なネットワーク遅延 (200-800ms) — ニュースAPIは遅めを想定
    const delay = 200 + Math.random() * 600;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 一定確率で障害をシミュレート
    if (Math.random() < this.failureRate) {
      this.logger.warn(`News service unavailable for city: ${city}`);
      throw new Error('News service temporarily unavailable');
    }

    this.logger.log(`Fetched local news for ${city} (${Math.round(delay)}ms)`);

    return {
      city,
      articles: this.generateMockArticles(city),
    };
  }

  private generateMockArticles(city: string): NewsArticle[] {
    const now = new Date();

    return [
      {
        id: `${city}-alert-1`,
        title: `${city}で今週末にかけて気温が急変する見込み`,
        summary: `気象庁は${city}周辺で今週末にかけて気温が大きく変動する可能性があると発表しました。外出の際は服装にご注意ください。`,
        category: 'weather_alert',
        publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        url: `https://example.com/news/${city}-weather-alert`,
      },
      {
        id: `${city}-event-1`,
        title: `${city}フードフェスティバル 来月開催決定`,
        summary: `地元の名店が集まるフードフェスティバルが来月${city}中心部で開催されます。100店舗以上が出店予定。`,
        category: 'local_event',
        publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        url: `https://example.com/news/${city}-food-festival`,
      },
      {
        id: `${city}-tourism-1`,
        title: `${city}の隠れた名所 - 地元民おすすめスポット5選`,
        summary: `観光ガイドには載らない、地元の人だけが知る${city}の魅力的なスポットをご紹介します。`,
        category: 'tourism',
        publishedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        url: `https://example.com/news/${city}-hidden-spots`,
      },
      {
        id: `${city}-alert-2`,
        title: `${city}の花粉情報 - 本日の飛散量は「やや多い」`,
        summary: `${city}エリアの本日の花粉飛散量は「やや多い」レベルです。花粉症の方はマスクの着用をおすすめします。`,
        category: 'weather_alert',
        publishedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        url: `https://example.com/news/${city}-pollen`,
      },
      {
        id: `${city}-event-2`,
        title: `${city}マラソン大会 参加者募集中`,
        summary: `今年で10回目を迎える${city}マラソン。5km・10km・フルマラソンの3部門で参加者を募集しています。`,
        category: 'local_event',
        publishedAt: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
        url: `https://example.com/news/${city}-marathon`,
      },
    ];
  }
}

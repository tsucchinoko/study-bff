import type { NewsArticleDetail } from '@study-bff/shared';

interface NewsListProps {
  articles: NewsArticleDetail[];
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  weather_alert: { label: '気象', color: '#e53935' },
  local_event: { label: 'イベント', color: '#1e88e5' },
  tourism: { label: '観光', color: '#43a047' },
};

/**
 * ニュース一覧（Web版）
 *
 * BFFがニュースサービスから取得した全記事を表示。
 * - 本文（summary）やURLも含む → Web版だからこそ表示できる情報量
 * - モバイル版ではタイトルのみ・3件に制限される
 */
export function NewsList({ articles }: NewsListProps) {
  if (articles.length === 0) {
    return (
      <div style={{ padding: 16, backgroundColor: '#fff3e0', borderRadius: 8, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#e65100' }}>Local News</h3>
        <p style={{ margin: 0, color: '#bf360c' }}>
          ニュースサービスが一時的に利用できません。他のデータは正常に表示されています。
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Local News</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {articles.map((article) => {
          const cat = categoryLabels[article.category] ?? { label: article.category, color: '#888' };
          return (
            <div key={article.id} style={{ padding: 14, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    backgroundColor: cat.color,
                    color: 'white',
                    borderRadius: 10,
                  }}
                >
                  {cat.label}
                </span>
                <span style={{ fontSize: 12, color: '#aaa' }}>
                  {new Date(article.publishedAt).toLocaleString('ja-JP')}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 4 }}>{article.title}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{article.summary}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

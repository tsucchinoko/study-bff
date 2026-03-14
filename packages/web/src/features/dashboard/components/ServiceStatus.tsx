interface ServiceStatusProps {
  services: {
    weather: 'ok' | 'error';
    airQuality: 'ok' | 'error';
    news: 'ok' | 'error';
  };
  cachedAt: string;
}

/**
 * サービス稼働状況パネル（Web版のみ）
 *
 * BFFが集約した3つのサービスの稼働状況を可視化。
 * 部分的フォールバックが発生しているかを一目で確認できる。
 */
export function ServiceStatus({ services, cachedAt }: ServiceStatusProps) {
  const entries = [
    { name: 'Weather', status: services.weather },
    { name: 'Air Quality', status: services.airQuality },
    { name: 'News', status: services.news },
  ];

  return (
    <div style={{ padding: 12, backgroundColor: '#fafafa', borderRadius: 8, marginTop: 16, fontSize: 13 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ color: '#aaa' }}>Services:</span>
        {entries.map((e) => (
          <span key={e.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: e.status === 'ok' ? '#4caf50' : '#f44336',
                display: 'inline-block',
              }}
            />
            {e.name}
          </span>
        ))}
        <span style={{ color: '#bbb', marginLeft: 'auto' }}>
          Cached: {new Date(cachedAt).toLocaleString('ja-JP')}
        </span>
      </div>
    </div>
  );
}

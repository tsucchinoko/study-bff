import type { ForecastItem } from '@study-bff/shared';

interface ForecastProps {
  items: ForecastItem[];
}

/**
 * 3時間毎の予報（Web版のみ）
 *
 * モバイル版では日別に集約されたデータを受け取るが、
 * Web版ではBFFが3時間毎の詳細データをそのまま返す
 */
export function Forecast({ items }: ForecastProps) {
  return (
    <div>
      <h3>5-Day Forecast (3-hour intervals)</h3>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
          {items.slice(0, 16).map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: 100,
                padding: 12,
                backgroundColor: '#f5f5f5',
                borderRadius: 6,
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 12, color: '#888' }}>
                {new Date(item.dateTime).toLocaleDateString('ja-JP', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              <div style={{ fontSize: 12, color: '#888' }}>
                {new Date(item.dateTime).toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.description}
                width={40}
                height={40}
              />
              <div style={{ fontWeight: 'bold' }}>{Math.round(item.temperature)}°C</div>
              <div style={{ fontSize: 11, color: '#666' }}>{item.description}</div>
              <div style={{ fontSize: 11, color: '#888' }}>
                Rain: {Math.round(item.pop * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

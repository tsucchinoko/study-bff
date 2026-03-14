import type { AirQualityDetail } from '@study-bff/shared';

interface AirQualityProps {
  data: AirQualityDetail | null;
}

const aqiColors: Record<number, string> = {
  1: '#4caf50',
  2: '#8bc34a',
  3: '#ff9800',
  4: '#f44336',
  5: '#9c27b0',
};

/**
 * 大気品質パネル（Web版）
 *
 * BFFが大気品質サービスから取得したデータをリッチに表示。
 * サービス障害時は null が来るので、フォールバックUIを表示する。
 */
export function AirQuality({ data }: AirQualityProps) {
  if (!data) {
    return (
      <div style={{ padding: 16, backgroundColor: '#fff3e0', borderRadius: 8, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#e65100' }}>Air Quality</h3>
        <p style={{ margin: 0, color: '#bf360c' }}>
          大気品質サービスが一時的に利用できません。他のデータは正常に表示されています。
        </p>
      </div>
    );
  }

  const color = aqiColors[data.aqi] ?? '#888';

  return (
    <div style={{ padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 16 }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Air Quality</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {data.aqi}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>{data.label}</div>
          <div style={{ color: '#666', fontSize: 14 }}>{data.healthAdvice}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
        {Object.entries(data.components).map(([key, value]) => (
          <div key={key} style={{ padding: 8, backgroundColor: '#fff', borderRadius: 4 }}>
            <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>{key}</div>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{value} <span style={{ fontSize: 11, color: '#aaa' }}>µg/m³</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { CurrentWeatherDetail } from '@study-bff/shared';

interface WeatherDetailsProps {
  weather: CurrentWeatherDetail;
}

/**
 * 詳細な天気情報（Web版のみ）
 *
 * モバイル版にはないデータを表示する
 * → BFFが Web向けにのみ返すフィールド
 */
export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const details = [
    { label: 'Humidity', value: `${weather.humidity}%` },
    { label: 'Pressure', value: `${weather.pressure} hPa` },
    { label: 'Wind', value: `${weather.windSpeed} m/s (${weather.windDirection}°)` },
    { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km` },
    { label: 'Clouds', value: `${weather.clouds}%` },
    { label: 'Sunrise', value: new Date(weather.sunrise).toLocaleTimeString('ja-JP') },
    { label: 'Sunset', value: new Date(weather.sunset).toLocaleTimeString('ja-JP') },
  ];

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {details.map((d) => (
          <div
            key={d.label}
            style={{
              padding: 12,
              backgroundColor: '#f5f5f5',
              borderRadius: 6,
            }}
          >
            <div style={{ fontSize: 12, color: '#888' }}>{d.label}</div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{d.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

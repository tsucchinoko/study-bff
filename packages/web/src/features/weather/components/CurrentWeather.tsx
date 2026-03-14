import type { CurrentWeatherDetail } from '@study-bff/shared';

interface CurrentWeatherProps {
  city: string;
  country: string;
  weather: CurrentWeatherDetail;
}

export function CurrentWeather({ city, country, weather }: CurrentWeatherProps) {
  return (
    <div style={{ padding: 20, backgroundColor: '#f0f8ff', borderRadius: 8, marginBottom: 16 }}>
      <h2 style={{ margin: '0 0 12px 0' }}>
        {city}, {country}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          width={80}
          height={80}
        />
        <div>
          <div style={{ fontSize: 48, fontWeight: 'bold' }}>
            {Math.round(weather.temperature)}°C
          </div>
          <div style={{ color: '#666' }}>{weather.description}</div>
          <div style={{ color: '#888', fontSize: 14 }}>
            Feels like {Math.round(weather.feelsLike)}°C
          </div>
        </div>
      </div>
    </div>
  );
}

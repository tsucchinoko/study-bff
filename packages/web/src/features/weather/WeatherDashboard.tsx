import { useWeather } from './hooks/useWeather';
import { CitySearch } from './components/CitySearch';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { Forecast } from './components/Forecast';

export function WeatherDashboard() {
  const { data, loading, error, search } = useWeather();

  return (
    <div>
      <CitySearch onSearch={search} loading={loading} />

      {error && (
        <div style={{ padding: 16, backgroundColor: '#ffe0e0', borderRadius: 8, color: '#c00' }}>
          {error}
        </div>
      )}

      {data && (
        <>
          <CurrentWeather city={data.city} country={data.country} weather={data.current} />
          <WeatherDetails weather={data.current} />
          <Forecast items={data.forecast} />

          {data.meta.cachedAt && (
            <div style={{ marginTop: 16, fontSize: 12, color: '#aaa' }}>
              Cached at: {new Date(data.meta.cachedAt).toLocaleString('ja-JP')} | Source: {data.meta.source}
            </div>
          )}
        </>
      )}
    </div>
  );
}

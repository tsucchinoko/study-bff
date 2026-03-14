import { useDashboard } from './hooks/useDashboard';
import { CitySearch } from '../weather/components/CitySearch';
import { CurrentWeather } from '../weather/components/CurrentWeather';
import { WeatherDetails } from '../weather/components/WeatherDetails';
import { Forecast } from '../weather/components/Forecast';
import { AirQuality } from './components/AirQuality';
import { NewsList } from './components/NewsList';
import { ServiceStatus } from './components/ServiceStatus';

/**
 * ダッシュボード画面
 *
 * BFFの /web/dashboard エンドポイントから、
 * 3つのサービス（天気 + 大気品質 + ニュース）のデータを
 * 1回のリクエストで取得して表示する。
 */
export function Dashboard() {
  const { data, loading, error, search } = useDashboard();

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
          <CurrentWeather city={data.city} country={data.country} weather={data.weather.current} />
          <WeatherDetails weather={data.weather.current} />
          <AirQuality data={data.airQuality} />
          <NewsList articles={data.news} />
          <Forecast items={data.weather.forecast} />
          <ServiceStatus services={data.meta.services} cachedAt={data.meta.cachedAt} />
        </>
      )}
    </div>
  );
}

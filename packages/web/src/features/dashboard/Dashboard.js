import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { children: [_jsx(CitySearch, { onSearch: search, loading: loading }), error && (_jsx("div", { style: { padding: 16, backgroundColor: '#ffe0e0', borderRadius: 8, color: '#c00' }, children: error })), data && (_jsxs(_Fragment, { children: [_jsx(CurrentWeather, { city: data.city, country: data.country, weather: data.weather.current }), _jsx(WeatherDetails, { weather: data.weather.current }), _jsx(AirQuality, { data: data.airQuality }), _jsx(NewsList, { articles: data.news }), _jsx(Forecast, { items: data.weather.forecast }), _jsx(ServiceStatus, { services: data.meta.services, cachedAt: data.meta.cachedAt })] }))] }));
}

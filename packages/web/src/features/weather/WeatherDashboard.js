import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useWeather } from './hooks/useWeather';
import { CitySearch } from './components/CitySearch';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { Forecast } from './components/Forecast';
export function WeatherDashboard() {
    const { data, loading, error, search } = useWeather();
    return (_jsxs("div", { children: [_jsx(CitySearch, { onSearch: search, loading: loading }), error && (_jsx("div", { style: { padding: 16, backgroundColor: '#ffe0e0', borderRadius: 8, color: '#c00' }, children: error })), data && (_jsxs(_Fragment, { children: [_jsx(CurrentWeather, { city: data.city, country: data.country, weather: data.current }), _jsx(WeatherDetails, { weather: data.current }), _jsx(Forecast, { items: data.forecast }), data.meta.cachedAt && (_jsxs("div", { style: { marginTop: 16, fontSize: 12, color: '#aaa' }, children: ["Cached at: ", new Date(data.meta.cachedAt).toLocaleString('ja-JP'), " | Source: ", data.meta.source] }))] }))] }));
}

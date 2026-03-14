import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WeatherDashboard } from './features/weather/WeatherDashboard';
export function App() {
    return (_jsxs("div", { style: { maxWidth: 960, margin: '0 auto', padding: '20px' }, children: [_jsx("h1", { children: "Weather Dashboard" }), _jsx("p", { style: { color: '#666', marginBottom: 24 }, children: "BFF (Backend for Frontend) Study - Web Version" }), _jsx(WeatherDashboard, {})] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 詳細な天気情報（Web版のみ）
 *
 * モバイル版にはないデータを表示する
 * → BFFが Web向けにのみ返すフィールド
 */
export function WeatherDetails({ weather }) {
    const details = [
        { label: 'Humidity', value: `${weather.humidity}%` },
        { label: 'Pressure', value: `${weather.pressure} hPa` },
        { label: 'Wind', value: `${weather.windSpeed} m/s (${weather.windDirection}°)` },
        { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km` },
        { label: 'Clouds', value: `${weather.clouds}%` },
        { label: 'Sunrise', value: new Date(weather.sunrise).toLocaleTimeString('ja-JP') },
        { label: 'Sunset', value: new Date(weather.sunset).toLocaleTimeString('ja-JP') },
    ];
    return (_jsxs("div", { style: { marginBottom: 16 }, children: [_jsx("h3", { children: "Details" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }, children: details.map((d) => (_jsxs("div", { style: {
                        padding: 12,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 6,
                    }, children: [_jsx("div", { style: { fontSize: 12, color: '#888' }, children: d.label }), _jsx("div", { style: { fontSize: 18, fontWeight: 'bold' }, children: d.value })] }, d.label))) })] }));
}

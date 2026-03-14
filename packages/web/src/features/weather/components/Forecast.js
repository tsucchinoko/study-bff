import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 3時間毎の予報（Web版のみ）
 *
 * モバイル版では日別に集約されたデータを受け取るが、
 * Web版ではBFFが3時間毎の詳細データをそのまま返す
 */
export function Forecast({ items }) {
    return (_jsxs("div", { children: [_jsx("h3", { children: "5-Day Forecast (3-hour intervals)" }), _jsx("div", { style: { overflowX: 'auto' }, children: _jsx("div", { style: { display: 'flex', gap: 8, paddingBottom: 8 }, children: items.slice(0, 16).map((item, i) => (_jsxs("div", { style: {
                            minWidth: 100,
                            padding: 12,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 6,
                            textAlign: 'center',
                            flexShrink: 0,
                        }, children: [_jsx("div", { style: { fontSize: 12, color: '#888' }, children: new Date(item.dateTime).toLocaleDateString('ja-JP', {
                                    month: 'short',
                                    day: 'numeric',
                                }) }), _jsx("div", { style: { fontSize: 12, color: '#888' }, children: new Date(item.dateTime).toLocaleTimeString('ja-JP', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }) }), _jsx("img", { src: `https://openweathermap.org/img/wn/${item.icon}.png`, alt: item.description, width: 40, height: 40 }), _jsxs("div", { style: { fontWeight: 'bold' }, children: [Math.round(item.temperature), "\u00B0C"] }), _jsx("div", { style: { fontSize: 11, color: '#666' }, children: item.description }), _jsxs("div", { style: { fontSize: 11, color: '#888' }, children: ["Rain: ", Math.round(item.pop * 100), "%"] })] }, i))) }) })] }));
}

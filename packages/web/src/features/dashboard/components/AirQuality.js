import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const aqiColors = {
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
export function AirQuality({ data }) {
    if (!data) {
        return (_jsxs("div", { style: { padding: 16, backgroundColor: '#fff3e0', borderRadius: 8, marginBottom: 16 }, children: [_jsx("h3", { style: { margin: '0 0 8px 0', color: '#e65100' }, children: "Air Quality" }), _jsx("p", { style: { margin: 0, color: '#bf360c' }, children: "\u5927\u6C17\u54C1\u8CEA\u30B5\u30FC\u30D3\u30B9\u304C\u4E00\u6642\u7684\u306B\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002\u4ED6\u306E\u30C7\u30FC\u30BF\u306F\u6B63\u5E38\u306B\u8868\u793A\u3055\u308C\u3066\u3044\u307E\u3059\u3002" })] }));
    }
    const color = aqiColors[data.aqi] ?? '#888';
    return (_jsxs("div", { style: { padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 16 }, children: [_jsx("h3", { style: { margin: '0 0 12px 0' }, children: "Air Quality" }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }, children: [_jsx("div", { style: {
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
                        }, children: data.aqi }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 18, fontWeight: 'bold' }, children: data.label }), _jsx("div", { style: { color: '#666', fontSize: 14 }, children: data.healthAdvice })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }, children: Object.entries(data.components).map(([key, value]) => (_jsxs("div", { style: { padding: 8, backgroundColor: '#fff', borderRadius: 4 }, children: [_jsx("div", { style: { fontSize: 11, color: '#888', textTransform: 'uppercase' }, children: key }), _jsxs("div", { style: { fontSize: 16, fontWeight: 'bold' }, children: [value, " ", _jsx("span", { style: { fontSize: 11, color: '#aaa' }, children: "\u00B5g/m\u00B3" })] })] }, key))) })] }));
}

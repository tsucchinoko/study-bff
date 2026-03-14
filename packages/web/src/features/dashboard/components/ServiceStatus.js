import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * サービス稼働状況パネル（Web版のみ）
 *
 * BFFが集約した3つのサービスの稼働状況を可視化。
 * 部分的フォールバックが発生しているかを一目で確認できる。
 */
export function ServiceStatus({ services, cachedAt }) {
    const entries = [
        { name: 'Weather', status: services.weather },
        { name: 'Air Quality', status: services.airQuality },
        { name: 'News', status: services.news },
    ];
    return (_jsx("div", { style: { padding: 12, backgroundColor: '#fafafa', borderRadius: 8, marginTop: 16, fontSize: 13 }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }, children: [_jsx("span", { style: { color: '#aaa' }, children: "Services:" }), entries.map((e) => (_jsxs("span", { style: { display: 'flex', alignItems: 'center', gap: 4 }, children: [_jsx("span", { style: {
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: e.status === 'ok' ? '#4caf50' : '#f44336',
                                display: 'inline-block',
                            } }), e.name] }, e.name))), _jsxs("span", { style: { color: '#bbb', marginLeft: 'auto' }, children: ["Cached: ", new Date(cachedAt).toLocaleString('ja-JP')] })] }) }));
}

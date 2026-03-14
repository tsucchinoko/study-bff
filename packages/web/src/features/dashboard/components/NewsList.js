import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const categoryLabels = {
    weather_alert: { label: '気象', color: '#e53935' },
    local_event: { label: 'イベント', color: '#1e88e5' },
    tourism: { label: '観光', color: '#43a047' },
};
/**
 * ニュース一覧（Web版）
 *
 * BFFがニュースサービスから取得した全記事を表示。
 * - 本文（summary）やURLも含む → Web版だからこそ表示できる情報量
 * - モバイル版ではタイトルのみ・3件に制限される
 */
export function NewsList({ articles }) {
    if (articles.length === 0) {
        return (_jsxs("div", { style: { padding: 16, backgroundColor: '#fff3e0', borderRadius: 8, marginBottom: 16 }, children: [_jsx("h3", { style: { margin: '0 0 8px 0', color: '#e65100' }, children: "Local News" }), _jsx("p", { style: { margin: 0, color: '#bf360c' }, children: "\u30CB\u30E5\u30FC\u30B9\u30B5\u30FC\u30D3\u30B9\u304C\u4E00\u6642\u7684\u306B\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002\u4ED6\u306E\u30C7\u30FC\u30BF\u306F\u6B63\u5E38\u306B\u8868\u793A\u3055\u308C\u3066\u3044\u307E\u3059\u3002" })] }));
    }
    return (_jsxs("div", { style: { marginBottom: 16 }, children: [_jsx("h3", { children: "Local News" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: articles.map((article) => {
                    const cat = categoryLabels[article.category] ?? { label: article.category, color: '#888' };
                    return (_jsxs("div", { style: { padding: 14, backgroundColor: '#f5f5f5', borderRadius: 8 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }, children: [_jsx("span", { style: {
                                            fontSize: 11,
                                            padding: '2px 8px',
                                            backgroundColor: cat.color,
                                            color: 'white',
                                            borderRadius: 10,
                                        }, children: cat.label }), _jsx("span", { style: { fontSize: 12, color: '#aaa' }, children: new Date(article.publishedAt).toLocaleString('ja-JP') })] }), _jsx("div", { style: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 }, children: article.title }), _jsx("div", { style: { fontSize: 13, color: '#666', lineHeight: 1.5 }, children: article.summary })] }, article.id));
                }) })] }));
}

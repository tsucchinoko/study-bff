import { Dashboard } from './features/dashboard/Dashboard';

export function App() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px' }}>
      <h1>City Dashboard</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        BFF (Backend for Frontend) Study - Web Version
        <br />
        <span style={{ fontSize: 12 }}>
          1回のリクエストで天気・大気品質・ニュースを取得（3サービス集約）
        </span>
      </p>
      <Dashboard />
    </div>
  );
}

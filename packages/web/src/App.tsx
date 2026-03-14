import { WeatherDashboard } from './features/weather/WeatherDashboard';

export function App() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px' }}>
      <h1>Weather Dashboard</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        BFF (Backend for Frontend) Study - Web Version
      </p>
      <WeatherDashboard />
    </div>
  );
}

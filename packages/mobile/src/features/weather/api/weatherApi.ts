import type { MobileWeatherResponse } from '@study-bff/shared';

// Expo開発時: localhostではなくマシンのIPを使う
// Android emulatorの場合: 10.0.2.2
const BFF_BASE = 'http://localhost:3000/api';

export async function fetchWeather(city: string): Promise<MobileWeatherResponse> {
  const res = await fetch(`${BFF_BASE}/mobile/weather?city=${encodeURIComponent(city)}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

import type { MobileWeatherResponse } from '@study-bff/shared';
import Constants from 'expo-constants';

// Expoの接続先ホストからIPを取得し、BFFのポートに差し替える
// シミュレータではlocalhost、実機では開発マシンのIPが自動で使われる
const debuggerHost = Constants.expoConfig?.hostUri ?? 'localhost:8081';
const host = debuggerHost.split(':')[0];
const BFF_BASE = `http://${host}:3000/api`;

export async function fetchWeather(city: string): Promise<MobileWeatherResponse> {
  const res = await fetch(`${BFF_BASE}/mobile/weather?city=${encodeURIComponent(city)}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

import type { MobileDashboardResponse } from '@study-bff/shared';
import Constants from 'expo-constants';

const debuggerHost = Constants.expoConfig?.hostUri ?? 'localhost:8081';
const host = debuggerHost.split(':')[0];
const BFF_BASE = `http://${host}:3000/api`;

export async function fetchDashboard(city: string): Promise<MobileDashboardResponse> {
  const res = await fetch(`${BFF_BASE}/mobile/dashboard?city=${encodeURIComponent(city)}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

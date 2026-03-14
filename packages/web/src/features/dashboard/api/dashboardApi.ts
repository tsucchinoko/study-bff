import type { WebDashboardResponse } from '@study-bff/shared';

const BFF_BASE = '/api';

export async function fetchDashboard(city: string): Promise<WebDashboardResponse> {
  const res = await fetch(`${BFF_BASE}/web/dashboard?city=${encodeURIComponent(city)}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

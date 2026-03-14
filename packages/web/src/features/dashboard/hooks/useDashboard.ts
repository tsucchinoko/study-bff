import { useState, useCallback } from 'react';
import type { WebDashboardResponse } from '@study-bff/shared';
import { fetchDashboard } from '../api/dashboardApi';

interface UseDashboardResult {
  data: WebDashboardResponse | null;
  loading: boolean;
  error: string | null;
  search: (city: string) => void;
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<WebDashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchDashboard(city);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
}

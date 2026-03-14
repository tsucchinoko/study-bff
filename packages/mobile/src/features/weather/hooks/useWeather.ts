import { useState, useCallback } from 'react';
import type { MobileWeatherResponse } from '@study-bff/shared';
import { fetchWeather } from '../api/weatherApi';

interface UseWeatherResult {
  data: MobileWeatherResponse | null;
  loading: boolean;
  error: string | null;
  search: (city: string) => void;
}

export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<MobileWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeather(city);
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

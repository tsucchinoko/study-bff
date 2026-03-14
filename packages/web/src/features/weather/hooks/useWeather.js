import { useState, useCallback } from 'react';
import { fetchWeather } from '../api/weatherApi';
export function useWeather() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const search = useCallback(async (city) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchWeather(city);
            setData(result);
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
            setData(null);
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { data, loading, error, search };
}

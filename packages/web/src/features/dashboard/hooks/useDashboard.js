import { useState, useCallback } from 'react';
import { fetchDashboard } from '../api/dashboardApi';
export function useDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const search = useCallback(async (city) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchDashboard(city);
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

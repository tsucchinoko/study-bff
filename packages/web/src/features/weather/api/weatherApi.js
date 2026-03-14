const BFF_BASE = '/api';
export async function fetchWeather(city) {
    const res = await fetch(`${BFF_BASE}/web/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP ${res.status}`);
    }
    return res.json();
}

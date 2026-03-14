import { useState } from 'react';

interface CitySearchProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function CitySearch({ onSearch, loading }: CitySearchProps) {
  const [city, setCity] = useState('Tokyo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City name (e.g. Tokyo, London)"
        style={{
          flex: 1,
          padding: '8px 12px',
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '8px 20px',
          fontSize: 16,
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  );
}

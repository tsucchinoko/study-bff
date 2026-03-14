import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function CitySearch({ onSearch, loading }) {
    const [city, setCity] = useState('Tokyo');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', gap: 8, marginBottom: 24 }, children: [_jsx("input", { type: "text", value: city, onChange: (e) => setCity(e.target.value), placeholder: "City name (e.g. Tokyo, London)", style: {
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: 16,
                    border: '1px solid #ccc',
                    borderRadius: 4,
                } }), _jsx("button", { type: "submit", disabled: loading, style: {
                    padding: '8px 20px',
                    fontSize: 16,
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: loading ? 'wait' : 'pointer',
                }, children: loading ? 'Loading...' : 'Search' })] }));
}

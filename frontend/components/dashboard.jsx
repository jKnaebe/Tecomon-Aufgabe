import { useState } from 'react';
import Card from './card';
import SearchBox from './search-box';
import { fetchWeather } from '../utils/api';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');

    try {
      const data = await fetchWeather(city);
      if (!cities.find(c => c.city === data.city)) {
        setCities(prev => [...prev, data]);
      }
      setCity('');
    } catch (err) {
      setError('Stadt nicht gefunden oder API Fehler.');
    } finally {
      setLoading(false);
    }
  };

  const removeCity = (cityName) => {
    setCities(prev => prev.filter(c => c.city !== cityName));
  };

  return (
    <div className="dashboard container">
      <SearchBox value={city} onChange={setCity} onSubmit={handleSearch} />
      {loading && <p>Lade Daten...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cities.map(weather => (
        <Card key={weather.city} weather={weather} onRemove={() => removeCity(weather.city)} />
      ))}
    </div>
  );
}
import { useState } from "react";
import { fetchWeather } from '../utils/api';
import WeatherCard from '../components/weather-card';
import SearchBox from "../components/search-box";
import './dashboard.css';

export default function Dashboard () {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if(!city.trim()) return;

        try {
            setError(null);
            const data = await fetchWeather(city);
            setWeather(data);
        }
        catch(err) {
            setWeather(null);
            setError('Keine Daten gefunden oder fehler bei der API.')
        }
    };

   return (
    <div className="dashboard">
      <h2>Wetterdaten</h2>

      <SearchBox city={city} setCity={setCity} onSearch={handleSearch} />

      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} />
    </div>
  );
}
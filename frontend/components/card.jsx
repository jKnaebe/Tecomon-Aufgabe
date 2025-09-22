import '../styles/card.css';
import { formatDate } from '../utils/formatDate';

export default function Card({ weather }) {
  if (!weather) return null;

  return (
    <div className="card">
      <p><strong>Stadt:</strong> {weather.city}</p>
      <p><strong>Temperatur:</strong> {weather.temperature}°C</p>
      <p><strong>Zustand:</strong> {weather.condition}</p>
      <p><strong>Aktualisiert:</strong> {formatDate(weather.updatedAt)}</p>
    </div>
  );
}
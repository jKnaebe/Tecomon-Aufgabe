import styles from '../styles/card.module.css';
import { formatDate } from '../utils/format-date';

export default function Card({ weather, onRemove }) {
  if (!weather) return null;

  return (
    <div className="card">
      <p><strong>Stadt:</strong> {weather.city}</p>
      <p><strong>Temperatur:</strong> {weather.temperature}°C</p>
      <p><strong>Zustand:</strong> {weather.condition}</p>
      <p><strong>Aktualisiert:</strong> {formatDate(weather.updatedAt)}</p>
      {onRemove && <button onClick={onRemove}>Entfernen</button>}
    </div>
  );
}
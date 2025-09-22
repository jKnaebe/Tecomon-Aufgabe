// frontend/components/Card.jsx
import styles from './Card.module.css';
import { formatDate } from '../utils/formatDate';

export default function Card({ weather, onRemove }) {
  if (!weather) return null;

  return (
    <div className={styles.card}>
      <p><strong>Stadt:</strong> {weather.city}</p>
      <p><strong>Temperatur:</strong> {weather.temperature}°C</p>
      <p><strong>Wind:</strong> {weather.windspeed} km/h</p>
      <p><strong>Aktualisiert:</strong> {formatDate(weather.updatedAt)}</p>
      <button onClick={onRemove}>Löschen</button>
    </div>
  );
}

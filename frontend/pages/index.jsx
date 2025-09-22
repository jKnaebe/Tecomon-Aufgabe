// frontend/pages/index.jsx
import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import Card from '../components/Card';
import { fetchWidgets, addWidget, deleteWidget } from '../utils/api';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [city, setCity] = useState('');
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Widgets beim Laden holen
  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    setLoading(true);
    try {
      const data = await fetchWidgets();
      setWidgets(data);
    } catch (err) {
      setError('Fehler beim Laden der Widgets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const newWidget = await addWidget(city);
      setWidgets(prev => [...prev, newWidget]);
    } catch (err) {
      setError(err.response?.data?.error || 'Fehler beim Hinzufügen der Stadt');
    } finally {
      setCity('');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWidget(id);
      setWidgets(prev => prev.filter(w => w._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Wetter Dashboard</h1>
      <SearchBox value={city} onChange={setCity} onSubmit={handleSearch} />
      {loading && <p>Lade Daten...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.cards}>
        {widgets.map(widget => (
          <Card key={widget._id} weather={widget.weather} onRemove={() => handleDelete(widget._id)} />
        ))}
      </div>
    </div>
  );
}

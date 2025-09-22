import { useState, useEffect } from 'react';
import { fetchWidgets, addWidget, deleteWidget } from '../utils/api';
import Card from '../components/card';
import SearchBox from '../components/search-box';

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Widgets beim Laden der Seite vom Backend holen
  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    try {
      const data = await fetchWidgets();
      setWidgets(data);
    } catch (err) {
      console.error(err);
      setError('Fehler beim Laden der Widgets');
    }
  };

  // Neue Stadt hinzufügen
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');

    try {
      await addWidget(city);    // POST an Backend
      await loadWidgets();      // Widgets vom Backend neu laden
      setCity('');              // Input leeren
    } catch (err) {
      setError(err.response?.data?.error || 'Fehler beim Hinzufügen der Stadt');
    } finally {
      setLoading(false);
    }
  };

  // Widget löschen
  const handleRemove = async (id) => {
    try {
      await deleteWidget(id);
      setWidgets(prev => prev.filter(w => w._id !== id));
    } catch (err) {
      console.error(err);
      setError('Fehler beim Löschen der Stadt');
    }
  };

  return (
    <div className="container">
      <h1>Wetter Dashboard</h1>

      <SearchBox
        value={city}
        onChange={setCity}
        onSubmit={handleSearch}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {widgets.map(widget => (
          <Card
            key={widget._id}
            weather={widget}
            onRemove={() => handleRemove(widget._id)}
          />
        ))}
      </div>
    </div>
  );
}

// frontend/components/SearchBox.jsx
import styles from './SearchBox.module.css';

export default function SearchBox({ value, onChange, onSubmit }) {
  return (
    <form className={styles.searchBox} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Stadt eingeben..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button type="submit">Hinzufügen</button>
    </form>
  );
}

import styles from './search-box.module.css';

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

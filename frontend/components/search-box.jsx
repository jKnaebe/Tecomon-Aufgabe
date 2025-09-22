import '../styles/search-box.css';

export default function SearchBox({ value, onChange, onSubmit }) {
  return (
    <form className="search-box" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Stadt eingeben..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button type="submit">Suchen</button>
    </form>
  );
}
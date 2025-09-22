import './styles/serach-box.css'

export default function SearchBox({ city, setCity, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={city}
        placeholder="Stadt eingeben..."
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Suchen</button>
    </div>
  );
}
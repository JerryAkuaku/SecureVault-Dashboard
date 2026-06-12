import "./SearchBar.css";

function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon">🔍</span>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search files and folders..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        spellCheck={false}
      />
      {/* Show clear button only when there is a query */}
      {query && (
        <button className="search-bar__clear" onClick={() => onQueryChange("")}>
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;

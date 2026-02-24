import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded-l"
      />
      <button className="bg-black text-white px-4 rounded-r">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
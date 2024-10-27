import React from "react";

const Search = ({ city, setCity, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;

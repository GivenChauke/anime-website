// frontend/src/pages/HomePage.js
import React, { useState } from 'react';
import { searchAnime } from '../services/animeService';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const animeResults = await searchAnime(query);
      setResults(animeResults);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl mb-6 text-center">Anime Search</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 w-full"
          placeholder="Search for an anime..."
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2">
          Search
        </button>
      </form>
      <div>
        {results.map((anime) => (
          <div key={anime.identifier} className="mb-4 p-4 border rounded">
            <h2 className="text-2xl">{anime.name}</h2>
            <p>ID: {anime.identifier}</p>
            <p>Languages: {anime.languages.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { searchAnime } from '../services/animeService';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null); // To store currently selected video URL

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const animeResults = await searchAnime(query);
      setResults(animeResults);
      console.log('Anime results:', animeResults);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  const handleStreamSelect = (url) => {
    setCurrentVideo(url); // Set the current video to the selected stream URL
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
        {results.length > 0 ? (
          results.map((anime) => (
            <div key={anime.identifier} className="mb-4 p-4 border rounded">
              <h2 className="text-2xl">{anime.name}</h2>
              <p>ID: {anime.identifier}</p>
              <p>Description: {anime.description}</p>
              <p>Languages: {anime.languages}</p>

              <h3 className="mt-4 text-xl">Episodes</h3>
              <ul>
                {anime.episodes.map((episode) => (
                  <li key={episode.episode} className="mb-2">
                    <strong>Episode {episode.episode}:</strong>
                    <ul className="ml-4">
                      {episode.streams.map((stream, index) => (
                        <li key={index}>
                          <button 
                            className="text-blue-600 underline"
                            onClick={() => handleStreamSelect(stream.url)}
                          >
                            {stream.resolution}p (Language: {stream.language})
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center">No results found. Please try a different search.</p>
        )}
      </div>

      {currentVideo && ( // Render video player if a video is selected
        <div className="mt-6">
          <h3 className="text-2xl mb-2">Now Playing:</h3>
          <div data-vjs-player>
            <video
              id="video-player"
              className="video-js vjs-default-skin"
              controls
              preload="auto"
              width="640"
              height="360"
              data-setup={`{ "techOrder": ["html5"], "sources": [{ "src": "${currentVideo}", "type": "application/x-mpegURL" }] }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

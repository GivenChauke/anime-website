import React from 'react';

const VideoBox = ({ anime }) => {
  return (
    <div className="mb-4 p-4 border rounded">
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
                  <a 
                    href={stream.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {stream.resolution}p (Language: {stream.language})
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoBox;

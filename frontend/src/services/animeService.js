// frontend/src/services/animeService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const searchAnime = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/anime/search/${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching anime data", error);
    throw error;
  }
};

import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchWeather(city) {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather/${city}`);
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    throw error;
  }
}
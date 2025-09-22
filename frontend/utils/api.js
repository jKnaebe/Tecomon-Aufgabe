// frontend/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/widgets';

export async function fetchWidgets() {
  const res = await axios.get(API_BASE_URL);
  return res.data;
}

export async function addWidget(city) {
  const res = await axios.post(API_BASE_URL, { city });
  return res.data;
}

export async function deleteWidget(id) {
  await axios.delete(`${API_BASE_URL}/${id}`);
}

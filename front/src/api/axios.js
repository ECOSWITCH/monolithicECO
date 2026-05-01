import axios from 'axios';

const api = axios.create({
  baseURL: 'https://monolithiceco.onrender.com'
});

export default api;
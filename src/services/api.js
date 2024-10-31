import axios from 'axios';

// Configura a URL base para o backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // A URL onde o backend está rodando
});

export default api;

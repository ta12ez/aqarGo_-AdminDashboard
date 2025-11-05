import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.111:8000/api', // غيّر لاحقًا بسهولة
});


export default api;
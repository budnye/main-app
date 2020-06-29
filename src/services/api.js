import axios from 'axios';

const header = { 'Content-Type': 'application/json' };
const mainApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: header,
});

const orderApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: header,
});

export { mainApi, orderApi };

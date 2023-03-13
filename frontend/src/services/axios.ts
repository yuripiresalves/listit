import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { 'listit.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return api;
}

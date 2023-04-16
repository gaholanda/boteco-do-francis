import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.cartola.globo.com/',
  headers: {
    'origin': 'https://cartola.globo.com'
  }
})
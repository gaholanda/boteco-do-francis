import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.cartola.globo.com/',
  headers: {
    'Access-Control-Allow-Origin' : '*',
  }
})
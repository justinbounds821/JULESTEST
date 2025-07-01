// api.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_CONFIG = {
  BASE_URL: 'https://api.saloanelemagic.ro',
  ENDPOINTS: {
    CUSTOMER_LOGIN: '/api/customers/customerLogin',
    CUSTOMER_CHECK_LOGIN: '/api/customers/checkLogin',
    LOCATIONS: '/api/locations', // [COMPLETEAZĂ ENDPOINT REAL]
    // [ADAUGĂ ALTE ENDPOINTS NECESARE]
  },
  HEADERS: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // Authorization va fi adăugat dinamic
  }
};

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers['X-Auth-Token'] = token;
  }
  return config;
});

export { API_CONFIG, apiClient };

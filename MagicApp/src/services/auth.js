// auth.js
import * as SecureStore from 'expo-secure-store';
import { apiClient, API_CONFIG } from './api';

const TokenService = {
  async saveToken(token) {
    // [IMPLEMENTEAZĂ SALVAREA SECURIZATĂ]
    try {
      await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
      // Potențial, aruncă o eroare personalizată sau gestionează altfel
    }
  },
  async getToken() {
    // [IMPLEMENTEAZĂ CITIREA TOKEN-ULUI]
    try {
      return await SecureStore.getItemAsync('userToken');
    } catch (error) {
      console.error('Error getting token:', error);
      // Potențial, aruncă o eroare personalizată sau gestionează altfel
      return null;
    }
  },
  async removeToken() {
    // [IMPLEMENTEAZĂ ȘTERGEREA TOKEN-ULUI]
    try {
      await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
      console.error('Error removing token:', error);
      // Potențial, aruncă o eroare personalizată sau gestionează altfel
    }
  }
};

const login = async (credentials) => {
  // credentials ar trebui să fie un obiect, de ex. { phone: "...", password: "..." }
  // Asigură-te că datele sunt formatate corect pentru 'application/x-www-form-urlencoded'
  const params = new URLSearchParams();
  // Adaptează în funcție de ce așteaptă API-ul (email sau phone)
  if (credentials.email) {
    params.append('email', credentials.email); // Sau orice cheie așteaptă API-ul
  } else if (credentials.phone) {
    params.append('phone', credentials.phone); // Sau orice cheie așteaptă API-ul
  }
  params.append('password', credentials.password);

  try {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CUSTOMER_LOGIN, params, {
      headers: {
        // Axios setează automat Content-Type pentru URLSearchParams,
        // dar îl putem specifica explicit dacă este necesar.
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const token = response.headers['x-auth-token']; // Atenție la case-sensitivity în headere
    if (token && response.data.success) {
      await TokenService.saveToken(token);
      return { success: true, data: response.data.data, token };
    } else {
      // Gestionează cazul în care login-ul nu este reușit dar API-ul returnează 2xx
      return { success: false, message: response.data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred during login.'
    };
  }
};

const logout = async () => {
  await TokenService.removeToken();
  // Aici ai putea adăuga și un call către un endpoint de logout pe API, dacă există
};

const checkLogin = async () => {
  try {
    const token = await TokenService.getToken();
    if (!token) return { loggedIn: false };

    // Verifică token-ul cu API-ul
    // Presupunând că apiClient adaugă automat token-ul în header
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CUSTOMER_CHECK_LOGIN);
    if (response.data.success) {
      return { loggedIn: true, user: response.data.data }; // Sau ce returnează API-ul
    } else {
      await TokenService.removeToken(); // Token invalid, șterge-l
      return { loggedIn: false };
    }
  } catch (error) {
    console.error('Check login error:', error.response ? error.response.data : error.message);
    // Dacă verificarea token-ului eșuează (ex: token expirat, eroare de rețea), consideră utilizatorul ca nelogat
    // Poți alege să ștergi token-ul și aici, în funcție de logica dorită
    // await TokenService.removeToken();
    return { loggedIn: false };
  }
};

export { TokenService, login, logout, checkLogin };

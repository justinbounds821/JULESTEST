// constants.js

export const COLORS = {
  primary: '#FF00FF', // Placeholder Magenta - [SPECIFICĂ CULOAREA PRINCIPALĂ]
  secondary: '#00FFFF', // Placeholder Cyan - [SPECIFICĂ CULOAREA SECUNDARĂ]
  success: '#00FF00', // Placeholder Green
  error: '#FF0000',   // Placeholder Red
  warning: '#FFA500', // Placeholder Orange
  background: '#FFFFFF', // Placeholder White
  text: '#000000',       // Placeholder Black
  textSecondary: '#888888', // Placeholder Gray
  border: '#CCCCCC',     // Placeholder Light Gray
  // Adaugă alte culori după necesități
};

export const FONTS = {
  regular: 'System', // Font default al sistemului - [SPECIFICĂ FONTURILE]
  medium: 'System',  // Ar trebui să specifici fonturi custom dacă le folosești
  bold: 'System',
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    // Adaugă alte dimensiuni după necesități
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  // Adaugă alte valori de spațiere după necesități
};

// Alte constante, de ex. chei pentru AsyncStorage, valori default, etc.
// export const ASYNC_STORAGE_KEYS = {
//   USER_TOKEN: 'user_token',
//   USER_PREFERENCES: 'user_preferences',
// };

// Dimensiuni ecran, dacă sunt necesare des
// import { Dimensions } from 'react-native';
// export const SCREEN_WIDTH = Dimensions.get('window').width;
// export const SCREEN_HEIGHT = Dimensions.get('window').height;

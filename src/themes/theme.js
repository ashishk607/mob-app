// Theme.js - Centralized styling constants
export const COLORS = {
    primary: '#FF7F50',       // Coral - main brand color
    secondary: '#F97794',     // Pink - secondary actions
    background: '#f8f8f8',    // Light gray - app background
    card: '#FFFFFF',          // White - card backgrounds
    text: {
      primary: '#333333',     // Dark gray - primary text
      secondary: '#666666',   // Medium gray - secondary text
      light: '#FFFFFF',       // White - text on dark backgrounds
      accent: '#FF7F50',      // Coral - accented text
    },
    border: '#EEEEEE',        // Light gray - borders
    success: '#2ecc71',       // Green - success states
    error: '#e74c3c',         // Red - error states
    overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black - modal backgrounds
  };
  
  export const SIZES = {
    base: 8,
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
    padding: 15,
    radius: 10,
  };
  
  export const FONTS = {
    h1: { fontSize: SIZES.xxlarge, fontWeight: 'bold', color: COLORS.text.primary },
    h2: { fontSize: SIZES.xlarge, fontWeight: 'bold', color: COLORS.text.primary },
    h3: { fontSize: SIZES.large, fontWeight: 'bold', color: COLORS.text.primary },
    body1: { fontSize: SIZES.medium, color: COLORS.text.primary },
    body2: { fontSize: SIZES.small, color: COLORS.text.secondary },
    button: { fontSize: SIZES.medium, fontWeight: '600', color: COLORS.text.light },
  };
  
  export const SHADOWS = {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 4,
    },
  };
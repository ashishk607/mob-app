// Ocean Theme - Calming and Sophisticated
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  // Color Palette
  colors: {
    primary: '#0277BD',
    secondary: '#4FC3F7',
    background: '#FAFEFF',
    card: '#FFFFFF',
    text: '#263238',
    subtext: '#607D8B',
    border: '#E1F5FE',
    notification: '#E53935',
    success: '#00897B',
    warning: '#FDD835',
    error: '#E53935',
    highlight: '#E1F5FE',
  },
  
  // Typography
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      tiny: 12,
      small: 14,
      medium: 16,
      large: 18,
      xlarge: 20,
      xxlarge: 24,
    },
    lineHeight: {
      tiny: 16,
      small: 20,
      medium: 24,
      large: 28,
      xlarge: 32,
      xxlarge: 36,
    },
  },
  
  // Spacing
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
  },
  
  // Border Radius
  borderRadius: {
    small: 2,
    medium: 4,
    large: 8,
    round: 9999,
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 6,
      elevation: 4,
    },
  },
  
  // Screen Dimensions
  dimensions: {
    width,
    height,
  },
};
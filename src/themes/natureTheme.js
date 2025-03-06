// Nature Theme - Earthy and Organic
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  // Color Palette
  colors: {
    primary: '#4CAF50',
    secondary: '#81C784',
    background: '#F5F5F0',
    card: '#FFFFFF',
    text: '#2E2E2E',
    subtext: '#5F6368',
    border: '#D8D8D0',
    notification: '#F44336',
    success: '#388E3C',
    warning: '#FFA000',
    error: '#D32F2F',
    highlight: '#E8F5E9',
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
    small: 6,
    medium: 12,
    large: 16,
    round: 9999,
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.16,
      shadowRadius: 3.84,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius: 5.46,
      elevation: 6,
    },
  },
  
  // Screen Dimensions
  dimensions: {
    width,
    height,
  },
};
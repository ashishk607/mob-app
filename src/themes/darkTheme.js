// Dark Theme - Modern and Sleek
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  // Color Palette
  colors: {
    primary: '#7C4DFF',
    secondary: '#B388FF',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    subtext: '#B0B0B0',
    border: '#333333',
    notification: '#FF453A',
    success: '#30D158',
    warning: '#FFD60A',
    error: '#FF453A',
    highlight: '#311B92',
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
    small: 4,
    medium: 8,
    large: 12,
    round: 9999,
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 5.46,
      elevation: 8,
    },
  },
  
  // Screen Dimensions
  dimensions: {
    width,
    height,
  },
};
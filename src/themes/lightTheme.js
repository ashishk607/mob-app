// Light Theme - Clean and Minimal
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  // Color Palette
  colors: {
    primary: '#4A90E2',
    secondary: '#6E7FF3',
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#333333',
    subtext: '#6B7280',
    border: '#E5E7EB',
    notification: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
    highlight: '#E3F2FD',
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
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
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
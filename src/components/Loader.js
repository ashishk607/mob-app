import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../styles/theme';

const Loader = ({ 
  message = "Loading...", 
  fullScreen = true, 
  transparent = true,
  size = "large" 
}) => {
  if (!fullScreen) {
    return (
      <View style={styles.inline}>
        <ActivityIndicator size={size} color={COLORS.primary} />
        {message && <Text style={styles.inlineText}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={[
      styles.container, 
      transparent && styles.transparentBg
    ]}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size={size} color={COLORS.primary} />
        {message && <Text style={styles.text}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  transparentBg: {
    backgroundColor: COLORS.overlay,
  },
  loaderBox: {
    padding: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    marginTop: SIZES.base,
    ...FONTS.body2,
    color: COLORS.text.primary,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.base,
  },
  inlineText: {
    marginLeft: SIZES.base,
    ...FONTS.body2,
    color: COLORS.text.primary,
  },
});

export default Loader;
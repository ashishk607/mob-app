import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../styles/theme';

const Header = ({ title = 'My App', showMenu = true, showBack = false, rightComponent }) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar 
        backgroundColor={COLORS.background} 
        barStyle="dark-content"
      />
      <View style={styles.container}>
        {showMenu && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.openDrawer()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="bars" size={SIZES.large} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
        
        {showBack && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="arrow-left" size={SIZES.large} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
        
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.rightComponent}>
          {rightComponent}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: Platform.OS === 'ios' ? 50 : SIZES.padding,
    paddingBottom: SIZES.padding,
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
    zIndex: 10,
  },
  iconButton: {
    padding: SIZES.base,
  },
  title: {
    ...FONTS.h3,
    flex: 1,
    marginLeft: SIZES.base,
  },
  rightComponent: {
    flexDirection: 'row',
  }
});

export default Header;
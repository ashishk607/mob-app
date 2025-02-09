import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  REMEMBER_EMAIL: '@remember_email',
  IS_FIRST_LOGIN: '@is_first_login',
  LAST_LOGIN_DATE: '@last_login_date'
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userData: null,
    isLoading: true
  });

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        const isFirstLogin = await AsyncStorage.getItem(STORAGE_KEYS.IS_FIRST_LOGIN);

        setAuthState({
          token,
          userData: userData ? JSON.parse(userData) : null,
          isFirstLogin: isFirstLogin !== null ? JSON.parse(isFirstLogin) : true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState({ token: null, userData: null, isLoading: false });
      }
    };

    loadAuthState();
  }, []);

  const login = useCallback(async (token, userData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_LOGIN_DATE, new Date().toISOString());
      await AsyncStorage.setItem(STORAGE_KEYS.IS_FIRST_LOGIN, JSON.stringify(false));

      setAuthState({ token, userData, isLoading: false });
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.LAST_LOGIN_DATE
      ]);

      setAuthState({ token: null, userData: null, isLoading: false });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return !!token;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  }, []);

  const getUserData = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout, checkAuthStatus, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

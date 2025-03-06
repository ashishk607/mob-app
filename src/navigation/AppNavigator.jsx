import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { authState } = useAuth();

  if (authState?.isLoading) {
    return <Loader message="Authenticating..." />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState?.token ? (
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

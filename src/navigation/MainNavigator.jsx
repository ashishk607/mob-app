import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Header from '../components/common/Header';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ApplicationScreen from '../screens/Applications/ApplicationScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Applications" component={ApplicationScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen name="UpdatePage" component={UpdatesScreen} options={{ title: 'Update Details' }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

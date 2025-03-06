import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/Home/HomeScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import StudyScreen from '../screens/Study/StudyScreen';
import DocumentScreen from '../screens/Documents/DocumentScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icons = {
          HomeTab: 'home',
          Updates: 'newspaper-o',
          Study: 'book',
          Documents: 'file-text-o',
          ProfileTab: 'user',
        };
        return <Icon name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF7F50',
      tabBarInactiveTintColor: '#333',
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="Updates" component={UpdatesScreen} />
    <Tab.Screen name="Study" component={StudyScreen} />
    <Tab.Screen name="Documents" component={DocumentScreen} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

export default TabNavigator;

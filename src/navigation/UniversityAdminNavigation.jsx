import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import Notice from '../screens/Notice/Notice';
import UniversityHomeScreen from '../screens/Home/UniversityHomeScreen';
import NoticePage from '../screens/Notice/NoticePage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Notice';
  return routeName === 'NoticePage' || routeName === 'NoticePageFromHome' ? 'none' : 'flex';
};

const NoticeStack = ({route}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="NoticePage" component={NoticePage} />
    </Stack.Navigator>
  );
};

const HomeStack = ({route}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={UniversityHomeScreen} />
      <Stack.Screen name="NoticePageFromHome" component={NoticePage} />
    </Stack.Navigator>
  );
};

const UniversityAdminNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: { display: getTabBarVisibility(route) },
        tabBarIcon: ({color, size}) => {
          const icons = {
            HomeTab: 'home',
            Notice: 'list-alt',
            ProfileTab: 'user',
          };
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4500',
        tabBarInactiveTintColor: '#555',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen 
        name="Notice" 
        component={NoticeStack} 
        options={{ 
          title: 'Notice',
          unmountOnBlur: true,
        }} 
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default UniversityAdminNavigation;

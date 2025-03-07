import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/Home/HomeScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import StudyScreen from '../screens/Study/StudyScreen';
import DocumentScreen from '../screens/Documents/DocumentScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import UniversityHomeScreen from '../screens/Home/UniversityHomeScreen';


const Tab = createBottomTabNavigator();

const UniversityAdminNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icons = {
            HomeTab: 'home',
            Notice: 'list-alt',
            Study: 'book',
            Documents: 'file-text-o',
            ProfileTab: 'user',
        };
        return <Icon name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF4500',
      tabBarInactiveTintColor: '#555',
    })}
  >

    <Tab.Screen name="HomeTab" component={ UpdatesScreen} options={{ title: 'Home' }} />

    <Tab.Screen name="Notice" component={UniversityHomeScreen} options={{title:'Notice'}}/>
    
    {/* <Tab.Screen name="Study" component={StudyScreen} /> */}
    {/* <Tab.Screen name="Documents" component={DocumentScreen} /> */}
    <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

export default UniversityAdminNavigation;

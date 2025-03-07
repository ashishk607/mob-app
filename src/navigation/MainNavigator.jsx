import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, ActivityIndicator, View} from 'react-native';
import TabNavigator from './TabNavigator';
import Header from '../components/common/Header';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ApplicationScreen from '../screens/Applications/ApplicationScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import UniversityAdminNavigation from './UniversityAdminNavigation';
import {API_BASE_URL} from '@env';
import {useAuth} from '../context/AuthContext'; // Assuming you have auth context

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [Role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const {authState, logout} = useAuth();
  const {token} = authState || {};

  useEffect(() => {
    fetchUserRole();
  }, [token]);

  const fetchUserRole = async () => {
    // setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/current-user`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.status === 401 || response.status === 403) {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
        );
        logout();
        return;
      }

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setRole(responseData.data.role);
      } else {
        Alert.alert(
          'Error',
          responseData.message || 'Failed to fetch user role.',
        );
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      Alert.alert('Error', 'Something went wrong while fetching user role.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {Role === 'collegeAdmin' ? (
        <Stack.Screen
          name="AdminTab"
          component={UniversityAdminNavigation}
          options={{header: () => <Header />}}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{header: () => <Header />}}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{header: () => <Header />}}
          />
          <Stack.Screen
            name="Applications"
            component={ApplicationScreen}
            options={{header: () => <Header />}}
          />
          <Stack.Screen
            name="UpdatePage"
            component={UpdatesScreen}
            options={{title: 'Update Details'}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

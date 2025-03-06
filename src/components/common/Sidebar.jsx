import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image, 
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SIZES, FONTS } from '../../themes/theme';
import { API_BASE_URL } from '@env';

const Sidebar = (props) => {
  const navigation = props.navigation;
  const { logout, authState } = useAuth();
  const { user: authUser, token } = authState || {};
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    avatar: null
  });

  useEffect(() => {
    fetchUserDetails();
  }, [token]);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 401 || response.status === 403) {
        Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
        logout();
        return;
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Unexpected Response:', textResponse);
        throw new Error('Invalid response format. Expected JSON.');
      }
  
      const responseData = await response.json();
  
      if (response.ok && responseData.success) {
        const { fullName, email, avatar } = responseData.data;
        setUser({
          fullName: fullName || '',
          email: email || '',
          avatar: avatar || null
        });
      } else {
        Alert.alert('Error', responseData.message || 'Failed to fetch user details.');
      }
    } 
    catch (error) {
      console.log('Error fetching user details:', error);
      Alert.alert('Error', 'Something went wrong while fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: handleLogout },
    ]);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { name: 'Home', icon: 'home', screen: 'HomeTab' },
    { name: 'Profile', icon: 'user', screen: 'ProfileTab' },
    { name: 'Applications', icon: 'folder', screen: 'Applications' },
    { name: 'Settings', icon: 'cog', screen: 'Settings' },
  ];

  const handleNavigation = (item) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    
    if (item.screen === 'HomeTab' || item.screen === 'ProfileTab') {
      navigation.navigate('MainStack', {
        screen: 'MainTabs',
        params: {
          screen: item.screen
        }
      });
    } else {
      navigation.navigate('MainStack', {
        screen: item.screen
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <>
            <Image 
              source={user.avatar ? { uri: user.avatar } : require('../../assets/default-avatar.png')} 
              style={styles.profileImage} 
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.fullName || 'User'}</Text>
              <Text style={styles.userEmail}>{user.email || 'user@example.com'}</Text>
            </View>
          </>
        )}
      </View>
      
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleNavigation(item)}
          >
            <Icon name={item.icon} size={SIZES.large} style={styles.icon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.7}
        onPress={confirmLogout}
      >
        <Icon name="sign-out" size={SIZES.large} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.card,
  },
  header: { 
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userInfo: {
    marginLeft: SIZES.padding,
  },
  userName: {
    ...FONTS.h3,
  },
  userEmail: {
    ...FONTS.body2,
  },
  menuContainer: {
    flex: 1,
    paddingTop: SIZES.padding,
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
  },
  icon: { 
    width: 24,
    textAlign: 'center',
    marginRight: SIZES.padding,
    color: COLORS.text.primary,
  },
  menuText: { 
    ...FONTS.body1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding * 1.5,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutIcon: {
    width: 24,
    textAlign: 'center',
    marginRight: SIZES.padding,
    color: COLORS.error,
  },
  logoutText: {
    ...FONTS.body1,
    color: COLORS.error,
  }
});

export default Sidebar;
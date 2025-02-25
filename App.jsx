import React, {useState, useRef, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import screens
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import UpdatesScreen from './src/screen/UpdatesScreen';
import StudyScreen from './src/screen/StudyScreen';
import DocumentsScreen from './src/screen/DocumentsScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import Document from './src/screen/Pages/DocumentDetails';
import UpdatePage from './src/screen/Pages/Updatepage';
import DocumentDetails from './src/screen/Pages/DocumentDetails';
import ExamForms from './src/screen/Pages/ExamForms';
import ApplyForm from './src/screen/Pages/ApplyForm';
import Applications from './src/screen/Applications';
import GovDocApplyUpdate from './src/screen/Pages/GovDocApplyUpdate';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'Updates':
              iconName = 'newspaper-o';
              break;
            case 'Study':
              iconName = 'book';
              break;
            case 'Documents':
              iconName = 'file-text-o';
              break;
            case 'ProfileTab':
              iconName = 'user';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF7F50',
        tabBarInactiveTintColor: '#333',
      })}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{title: 'Home'}}/>
      <Tab.Screen name="Updates" component={UpdatesScreen} />
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{title: 'Profile'}}/>
    </Tab.Navigator>
  );
};

const Header = ({toggleSidebar}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={toggleSidebar}>
      <Icon name="bars" size={24} color="#333" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="bell" size={24} color="#333" />
    </TouchableOpacity>
  </View>
);

const MainStack = ({toggleSidebar}) => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={TabNavigator}
      options={{
        header: () => <Header toggleSidebar={toggleSidebar} />,
      }}
    />
    <Stack.Screen name="Settings" component={SettingsScreen}
      options={{
        header: () => <Header toggleSidebar={toggleSidebar} />,
      }}
    />

    <Stack.Screen name="Applications" component={Applications}
      options={{
        header: () => <Header toggleSidebar={toggleSidebar} />,
      }}/>
    <Stack.Screen name="UpdatePage" component={UpdatePage} options={{title: 'Update Details'}}/>
    <Stack.Screen name="DocumentDetails" component={DocumentDetails} options={{title: 'Update Details'}}/>
    <Stack.Screen name="ExamForm" component={ExamForms} options={{title: 'Forms'}}/>
    <Stack.Screen name="Form_Apply" component={ApplyForm} options={({ route }) => ({ title: route.params?.title || 'Forms' })} />
    <Stack.Screen name="GovDocument" component={GovDocApplyUpdate} options={{title: 'Gov Document'}}/>

  </Stack.Navigator>
);

const AppNavigator = () => {
  const {authState, logout} = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarOffset = useRef(new Animated.Value(-width * 0.75)).current;
  const navigation = useNavigation();

  const closeSidebar = (callback) => {
    Animated.timing(sidebarOffset, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsSidebarVisible(false);
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      closeSidebar();
    } else {
      setIsSidebarVisible(true);
      Animated.timing(sidebarOffset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleNavigation = screen => {
    if (screen === 'Logout') {
      closeSidebar(() => confirmLogout());
      return;
    }
    
    closeSidebar(() => {
      navigation.navigate(screen);
    });
  };
  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: handleLogout,
        },
      ],
      {cancelable: true},
    );
  };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
      console.error('Logout error:', error);
    }
  };

  if (authState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {authState.token ? (
        <>
          <MainStack toggleSidebar={toggleSidebar} />
          <Modal transparent visible={isSidebarVisible} animationType="none">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={toggleSidebar}>
              <Animated.View
                style={[
                  styles.sidebar,
                  {transform: [{translateX: sidebarOffset}]},
                ]}>
                <View style={styles.sidebarContent}>
                  <Text style={styles.sidebarTitle}>Menu</Text>
                  {authState.userData && (
                    <View style={styles.userInfo}>
                      <Icon name="user-circle" size={50} color="#FF7F50" />
                      <Text style={styles.userName}>
                        {authState.userData.name || 'User'}
                      </Text>
                      <Text style={styles.userEmail}>
                        {authState.userData.email || ''}
                      </Text>
                    </View>
                  )}
                  {[
                    {name: 'Profile', icon: 'user', screen: 'ProfileTab'},
                    {name: 'Settings', icon: 'cog', screen: 'Settings'},
                    {name :'Applicatoins' ,icon :"folder", screen:'Applications'},
                    {name: 'Logout', icon: 'sign-out', screen: 'Logout'},

                  ].map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.sidebarItem}
                      onPress={() => handleNavigation(item.screen)}>
                      <Icon name={item.icon} size={20} color="#333" />
                      <Text style={styles.sidebarText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        <AuthStack />
      )}
    </View>
  );
};

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationWrapper />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  sidebarContent: {
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sidebarText: {
    fontSize: 18,
    marginLeft: 10,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

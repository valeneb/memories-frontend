import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          let iconImage = null;

          if (route.name === 'Map') {
            iconName = 'globe';
          } else if (route.name === 'Profil') {
            iconName = 'user';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return (
            <FontAwesome
              name={iconName}
              size={size + 8}
              color={color}
              style={{ marginBottom: -16 }}
            />
          );
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarStyle: { backgroundColor: '#D8725B' },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Map"
        component={HomeScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: '' }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = '';
              let iconImage = null;

              if (route.name === 'Map') {
                iconName = 'globe';
              } else if (route.name === 'Profil') {
                iconName = 'user';
              } else if (route.name === 'Search') {
                iconName = 'search';
              }

              return (
                <FontAwesome
                  name={iconName}
                  size={size + 8}
                  color={color}
                  style={{ marginBottom: -16 }}
                />
              );
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
            tabBarStyle: { backgroundColor: '#D8725B' },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Map"
            component={HomeScreen}
            options={{ tabBarLabel: '' }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfilScreen}
            options={{ tabBarLabel: '' }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{ tabBarLabel: '' }}
          />
        </Tab.Navigator>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

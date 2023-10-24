import { StyleSheet} from 'react-native';
import LoginScreen from './screens/LoginScreen';

import 'expo-dev-client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});

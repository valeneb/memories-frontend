import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Button,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import mapStyle from '../components/homepage/mapStyle.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalY] = useState(new Animated.Value(height - 120)); //// affichage du bouton ok, quand fermé

  const handleButtonPress = () => {
    setIsOpen(!isOpen);
    isOpen ? closeModal() : openModal();
  };

  //useEffect pas nécessaire, juste pour comprendre où est modalY
  useEffect(() => {
    console.log('====', modalY);
  }, [modalY]);

  const openModal = () => {
    Animated.timing(modalY, {
      duration: 300,
      toValue: 60, //jouer avec les tailles ici
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalY, {
      duration: 300,
      toValue: height - 120, // affichage du bouton ok, quand fermé
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: 30,
          longitude: 10,
          latitudeDelta: 60,
          longitudeDelta: 60,
        }}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      />

      <SafeAreaView style={{ ...styles.menu }}>
        {
          <Animated.View
            style={{
              ...styles.modal,
              backgroundColor: 'pink',
              transform: [{ translateY: modalY }],
            }}
            // visible={isOpen}
          >
            <TouchableOpacity
              onPress={handleButtonPress}
              style={styles.button}
              activeOpacity={0.8}
            >
              <FontAwesome name="compass" size={50} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Mes voyages</Text>
            <View style={styles.line}></View>
          </Animated.View>
        }
      </SafeAreaView>
    </View>
  );
}

// DESIGN A REVOIR
const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 0,
    border: 0,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#D8725B',
    backgroundColor: '#073141',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width,
    height: height - 120,
    alignItems: 'center',
    backgroundColor: '#F2DDC2',
    position: 'absolute',
    bottom: 60,
    left: 0,
  },
  title: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#073040',
    textAlign: 'center',
  },
  line: {
    width: width * 0.7,
    height: 2,
    backgroundColor: '#073040',
    marginTop: 10,
    marginBottom: 20,
  },
});

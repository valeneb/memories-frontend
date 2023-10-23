import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import mapStyle from '../components/homepage/mapStyle.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonPress = () => {
    setIsOpen(!isOpen);
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

      <SafeAreaView style={styles.menu}>
        {isOpen ? (
          <View visible={isOpen} animationType="slide">
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={handleButtonPress}
                style={styles.button}
                activeOpacity={0.8}
              >
                <FontAwesome name="compass" size={50} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>Mes voyages</Text>
              <View style={styles.line}></View>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleButtonPress}
            style={styles.button}
            activeOpacity={0.8}
          >
            <FontAwesome name="compass" size={50} color="#fff" />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

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
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#D8725B',
    backgroundColor: '#073141',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width,
    height: height * 0.9,
    alignItems: 'center',
    backgroundColor: '#F2DDC2',
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

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

export default function TarvelCard() {
  const travelData = [
    {
      title: 'Voyage 1',
      image: require('../assets/favicon.png'),
      departure: '01 Janvier 2023',
      arrival: '10 Janvier 2023',
    },
    {
      title: 'Voyage 2',
      image: require('../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
    {
      title: 'Voyage 3',
      image: require('../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
    {
      title: 'Voyage 4',
      image: require('../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
    {
      title: 'Voyage 5',
      image: require('../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
  ];

  const handleClick = () => {
    onClick(title);
  };

  const travelList = travelData.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.buttonTravelCard}
        // onPress={() => handleClick()} COMPLETER LA FONCTIONNALITE
      >
        <View style={styles.imageContainer}>
          <Image source={data.image} style={styles.image} />
        </View>
        <View style={styles.travelCardTextContainer}>
          <Text style={styles.travelCardDestination}>{data.title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.travelCardDate}>Du {data.departure}</Text>
            <Text style={styles.travelCardDate}>au {data.arrival}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return <ScrollView style={styles.travelList}>{travelList}</ScrollView>;
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonTravelCard: {
    flexDirection: 'row',
    backgroundColor: '#073040',
    width: width * 0.8,
    height: height * 0.14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 32,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: width * 0.28,
    height: height * 0.17,
    borderRadius: 10,
  },
  travelCardTextContainer: {
    padding: 10,
    justifyContent: 'space-around',
  },
  travelCardDate: {
    color: '#F2DCC2',
    fontSize: Math.min(width, height) * 0.04,
  },
  travelCardDestination: {
    color: '#F2DCC2',
    fontSize: Math.min(width, height) * 0.06,
    marginBottom: 16,
  },
});

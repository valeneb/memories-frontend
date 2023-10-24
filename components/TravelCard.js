import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, Dimensions } from 'react-native';

export default function TarvelCard({
  title,
  image,
  departure,
  arrival,
  onClick,
}) {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <TouchableOpacity
      style={styles.buttonTravelCard}
      onPress={() => handleClick()}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.travelCardTextContainer}>
        <Text style={styles.travelCardDestination}>{title}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.travelCardDate}>Du {departure}</Text>
          <Text style={styles.travelCardDate}>au {arrival}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
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
    margin: 10,
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

import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { deleteTravel } from '../../reducers/travel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ROUTE_BACK = 'http://192.168.1.13:3000';

export default function TravelCard({
  title,
  image,
  departureDate,
  returnDate,
  navigation,
  id,
}) {
  const dispatch = useDispatch();

  const [isDelete, setIsDelete] = useState(false);

  const handleClick = () => {
    navigation.navigate('Travel', { travelId: id });
  };

  const handleDelete = () => {
    fetch(`${ROUTE_BACK}/travel/deleteTrip`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteTravel(id));
          setIsDelete(false);
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsDelete(false)}>
      <View style={tw`flex flex-col`}>
        {isDelete && (
          <View style={tw`flex items-end`}>
            <TouchableOpacity
              style={tw`bg-[#073040] flex items-center p-[.3rem] rounded-[.5rem]`}
              onPress={handleDelete}
            >
              <FontAwesome name="times" size={16} color="#F2DCC2" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.buttonTravelCard}
          onPress={() => handleClick()}
          onLongPress={() => setIsDelete(true)}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/favicon.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.travelCardTextContainer}>
            <Text style={styles.travelCardDestination}>{title}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.travelCardDate}>Du {departureDate}</Text>
              <Text style={styles.travelCardDate}>au {returnDate}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonTravelCard: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: width * 0.8,
    height: height * 0.17, // Ajustez la hauteur pour englober toute l'image
    alignItems: 'center',
    paddingRight: 8,
    marginBottom: 32,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    overflow: 'hidden', // Masque toute partie d'image qui dépasse
  },
  image: {
    width: width * 0.28,
    height: height * 0.17, // Assurez-vous que la hauteur correspond à la hauteur du conteneur
    borderRadius: 10,
  },
  travelCardTextContainer: {
    padding: 10,
    justifyContent: 'space-around',
    height: height * 0.15, // Ajustez la hauteur pour correspondre à la hauteur du bouton
    backgroundColor: '#073040',
    width: width * 0.52,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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

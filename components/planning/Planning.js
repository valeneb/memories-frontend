import { View, ScrollView, StyleSheet, Modal, Keyboard } from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import Header from '../Header';
import SelectListing from './SelectListingModal';
import AccomodationCard from './AccomodationCard';
import FlightCard from './FlightCard';
import CarRentalCard from './CarRentalCard';
import OtherCard from './OtherCard';
import AddButton from '../AddButton';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initPlanning, addPlanning } from '../../reducers/planning';
//import {API_KEY} from '@env';

const API_KEY = 'http://192.168.1.59:3000';

export default function Planning({ isDairyActive, setIsDairyActive, travel }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const planning = useSelector((state) => state.planning.value);

  // affichage de la modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // ajout d'une nouvelle info voyage
  const addInfos = (val) => {
    dispatch(addPlanning({ category: val, data: { temporaryId: '1' } }));
    toggleModal();
  };

  const isTravelPlanningEmpty = () => {
    if (
      Object.values(planning).some((e) => e.length > 0)
      // planning?.accommodations.length > 0 ||
      // planning?.carRentals.length > 0 ||
      // planning?.flights.length > 0 ||
      // planning?.others.length > 0
    ) {
      return false;
    }

    return true;
  };

  const displayTravelPlanningElements = () => {
    const result = [];

    for (const key in planning) {
      if (!planning[key]) {
        break;
      }
      if (planning[key].length > 0) {
        planning[key].map((element, index) => {
          switch (key) {
            case 'accommodations':
              result.push(
                <AccomodationCard
                  infos={element}
                  key={`${index}_${key}`}
                  travelId={travel._id}
                />
              );
              break;
            case 'flights':
              result.push(
                <FlightCard
                  infos={element}
                  key={`${index}_${key}`}
                  travelId={travel._id}
                />
              );
              break;
            case 'others':
              result.push(
                <OtherCard
                  infos={element}
                  key={`${index}_${key}`}
                  travelId={travel._id}
                />
              );
              break;
            case 'carRentals':
              result.push(
                <CarRentalCard
                  infos={element}
                  key={`${index}_${key}`}
                  travelId={travel._id}
                />
              );
              break;
            default:
              break;
          }
        });
      }
    }

    return result;
  };

  console.log(planning);

  useEffect(() => {
    fetch(
      `${API_KEY}/travel/planning?travelId=${travel._id}&userId=${travel.user}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(initPlanning(data.planning));
        }
      });
  }, [travel._id]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full flex justify-between`}>
      <Header
        title={travel.destination}
        id={travel._id}
        isDairyActive={isDairyActive}
        setIsDairyActive={setIsDairyActive}
      />
      {planning && !isTravelPlanningEmpty() ? (
        <ScrollView style={tw`w-full h-full`}>
          {/* <View style={tw`w-full`}>{displayTravelPlanningElements()}</View> */}
        </ScrollView>
      ) : (
        <View style={tw`w-full h-[90%] flex items-center justify-center`}>
          <ButtonLarge title="Commencer mon programme" onClick={toggleModal} />
        </View>
      )}
      {planning && !isTravelPlanningEmpty() && !isKeyboardVisible && (
        <AddButton onClick={toggleModal} />
      )}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View
          style={tw`flex h-full justify-center items-center bg-opacity-50 bg-black`}
        >
          <SelectListing addInfos={addInfos} toggleModal={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80, // Ajustez la taille selon vos besoins
    height: 80, // Ajustez la taille selon vos besoins
    borderRadius: 40, // Un rayon de moitié de la largeur/hauteur rendra le bouton rond
    backgroundColor: 'blue', // Couleur de fond du bouton
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 24, // Ajustez la taille du symbole "+" selon vos besoins
    color: 'white', // Couleur du symbole "+"
  },
});

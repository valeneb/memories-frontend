import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import Header from '../Header';
import SelectListing from './SelectListingModal';
import AccomodationCard from './AccomodationCard';
import FlightCard from './FlightCard';
import CarRentalCard from './CarRentalCard';
import OtherCard from './OtherCard';
import ButtonUD from './ButtonUpdateDelete';
import InputHour from './InputHour';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initPlanning,
  addPlanning,
  updatePlanning,
  deletePlanning,
} from '../../reducers/planning';
import { API_KEY } from '@env';

export default function Planning({ isDairyActive, setIsDairyActive, travel }) {
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // récupérer l'option validé de la modal

  const dispatch = useDispatch();
  const planning = useSelector((state) => state.planning.value);

  //Récupération des données flights
  useEffect(() => {
    fetch(`${API_KEY}/flight/getFlights?_id=${travel._id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(initPlanning({ category: 'flights', data: data.flights }));
      });
  }, [travel._id]);

  const onClick = () => {
    setEdit(!edit);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // AJOUT INFO VOYAGE EN BDD
  const addInfos = (val) => {
    if (val === "Billet d'avion") {
      dispatch(addPlanning({ category: 'flights', data: [{}] }));
    } else {
      // FAIRE LES AUTRES CONDITIONS POUR ACCOMODATION, OTHER, CAR en if else
      console.log('edit ton addInfos');
    }
    setSelectedOption(val);
    toggleModal();
  };

  console.log('const planning', planning);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full flex items-center`}>
      <Header
        title={travel.destination}
        id={travel._id}
        isDairyActive={isDairyActive}
        setIsDairyActive={setIsDairyActive}
      />
      {planning.length > 0 ? (
        <ScrollView style={tw`bg-[#F2DDC2] w-full h-full`}>
          <View style={tw`w-full h-full p-[.5rem]`}>
            {planning.value.flights.map((flight, index) => {
              return (
                <View key={index} style={tw`w-full`}>
                  <FlightCard
                    departure={flight.departure}
                    hour={flight.hour}
                    seatNumber={flight.seatNumber}
                    compagny={flight.compagny}
                    notes={flight.notes}
                  />
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            style={tw`w-16 h-16 rounded-full bg-[#073040] items-center justify-center`}
            onClick={toggleModal}
          >
            <Text style={tw`text-white text-4xl`}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          {selectedOption ? null : (
            <View style={tw`w-full h-[90%] flex items-center justify-center`}>
              <ButtonLarge
                title="Commencer mon programme"
                onClick={toggleModal}
              />
            </View>
          )}
        </>
      )}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View
          style={tw`flex h-full justify-center items-center bg-opacity-50 bg-black`}
        >
          <SelectListing addInfos={addInfos} toggleModal={toggleModal} />
        </View>
      </Modal>
      <ScrollView style={tw`w-full h-full`}>
        <View style={`flex flex-col items-center w-full`}>
          {selectedOption === 'Location de voiture' && <CarRentalCard />}
          {selectedOption === "Billet d'avion" && <FlightCard />}
          {selectedOption === 'Logement' && <AccomodationCard />}
          {selectedOption === 'Autre' && <OtherCard />}
        </View>
      </ScrollView>
    </View>
  );
}

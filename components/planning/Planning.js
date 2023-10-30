/* READ ME POUR CHARLIE

Le problème vient du style ButtonLarge (l.93)
Lorsque le style est mis en commentaire, tout se passe bien, tu cliques dessus la modal apparait tu sélectionnes ton activité et visuellement elle s'ajoute. Même si je n'arrive pas à la centrer.
Mais lorsque le style du Button est "actif", l'activité doit surement apparaitre mes hors écran.

*/

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

const ROUTE_BACK = 'http://192.168.1.13:3000';

export default function Planning({ isDairyActive, setIsDairyActive, travel }) {
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // récupérer l'option validé de la modal

  const dispatch = useDispatch();
  const planning = useSelector((state) => state.planning.value);

  /*//Récupération des données
    useEffect(() => {
    fetch(METTRE LA BONNE ROUTE A FETCHER)
      .then((response) => response.json())
      .then((data) => {
        dispatch(initPlanning(data));
      });
  }, [planning._id]);  // vérif si c'est bien planning en BDD
  */

  const onClick = () => {
    setEdit(!edit);
  };

  // affichage de la modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // ajout d'une nouvelle info voyage
  const addInfos = (val) => {
    dispatch(addPlanning({ category: val, data: [{}] }));
    setSelectedOption(val);
    toggleModal();
  };

  console.log('planning from planning', planning);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      <Header
        title={travel.destination}
        id={travel._id}
        isDairyActive={isDairyActive}
        setIsDairyActive={setIsDairyActive}
      />
      {planning.length > 0 ? (
        <ScrollView>
          <Text>Insérer le mapping des données quand le fetch sera OK</Text>
          <TouchableOpacity
            style={tw`w-16 h-16 rounded-full bg-[#073040] items-center justify-center`}
            onClick={toggleModal}
          >
            <Text style={tw`text-white text-4xl`}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View /*style={tw`w-full h-[90%] flex items-center justify-center`}*/>
          {selectedOption ? null : (
            <ButtonLarge
              title="Commencer mon programme"
              onClick={toggleModal}
            />
          )}
        </View>
      )}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View
          style={tw`flex h-full justify-center items-center bg-opacity-50 bg-black`}
        >
          <SelectListing addInfos={addInfos} toggleModal={toggleModal} />
        </View>
      </Modal>
      <ScrollView style={tw`sticky bo`}>
        {selectedOption === 'Location de voiture' && <CarRentalCard />}
        {selectedOption === "Billet d'avion" && <FlightCard />}
        {selectedOption === 'Logement' && <AccomodationCard />}
        {selectedOption === 'Autre' && <OtherCard />}
      </ScrollView>
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

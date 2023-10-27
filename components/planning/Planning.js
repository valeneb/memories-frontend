import {
  View,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import Button from '../Button';
import Header from '../Header';
import SelectListing from './SelectListing';
import Accomodation from './Accomodation';
import CarLocation from './CarLocation';
import Flights from './Flights';
import Other from './Other';
import ButtonUD from './ButtonUD';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Planning({ isDairyActive, setIsDairyActive }) {
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const onClick = () => {
    setEdit(!edit);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      <Header
        title="Brazil"
        isDairyActive={isDairyActive}
        setIsDairyActive={setIsDairyActive}
      />
      <View
        style={tw`w-full h-full flex items-center justify-center items-center justify-center rounded-[.625rem] `}
      >
        <Accomodation />

        {/* CONDITION SI LE PLANNING = 0 alors => s'affiche
         {isModalVisible ? (
          <SelectListing setSelected={setSelected} toggleModal={toggleModal} />
        ) : (
          <ButtonLarge title="Commencer mon programme" onClick={toggleModal} />
        )}
        SINON ON AFFICHE LES INFOS DÉJA PRESENTE ET LISTING APPARAIT AVEC LE BOUTON + */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

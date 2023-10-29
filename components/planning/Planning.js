import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import Header from '../Header';
import SelectListing from './SelectListingModal';
import Accomodation from './AccomodationCard';
import Flights from './FlightCard';
import CarLocation from './CarRentalCard';
import Other from './OtherCard';
import ButtonUD from './ButtonUpdateDelete';
import InputHour from './InputHour';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initPlanning, addPlanning } from '../../reducers/planning';

const ROUTE_BACK = 'http://192.168.1.13:3000';

export default function Planning({ isDairyActive, setIsDairyActive, travel }) {
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const planning = useSelector((state) => state.planning.value);

  const onClick = () => {
    setEdit(!edit);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addInfos = (val) => {
    dispatch(addPlanning({ category: val, data: [{}] }));
    toggleModal();
  };

  console.log('planning', planning);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      <Header
        title={travel.destination}
        id={travel._id}
        isDairyActive={isDairyActive}
        setIsDairyActive={setIsDairyActive}
      />
      <View
        style={tw`w-full h-full flex items-center justify-center items-center justify-center rounded-[.625rem] `}
      >
        {planning.accomodations.map((item) => {
          return <Text>{JSON.stringify(item)}</Text>;
        })}
        <SelectListing addInfos={addInfos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

import React from 'react';
import { ScrollView, View } from 'react-native';
import TravelCard from '../TravelCard';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import { useSelector } from 'react-redux';

export default function TravelList({setNewTravel, navigation}) {
  const travel = useSelector((state) => state.travel.value);

  const handleNewTravel = () => {
    setNewTravel(true);
  };

  return (
    <View style={tw`w-full flex flex-col items-center h-full`}>
      <ScrollView>
        {travel.map((data, i) => (
          <TravelCard
            key={i}
            title={data.destination}
            departureDate={data.departure}
            returnDate={data.return}
            navigation={navigation}
            id={data._id}
          />
        ))}
      </ScrollView>
      <ButtonLarge title="Ajouter un nouveau voyage" icon="plus" onClick={handleNewTravel}/>
    </View>
  );
}


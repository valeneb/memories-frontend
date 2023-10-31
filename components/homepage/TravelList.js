import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import TravelCard from './TravelCard';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import { useSelector } from 'react-redux';

export default function TravelList({setNewTravel, navigation, onClick}) {
  const travel = useSelector((state) => state.travel.value);

  const handleNewTravel = () => {
    setNewTravel(true);
  };

  return (
    <View style={tw`w-full flex flex-col items-center justify-between h-full pt-[2rem]`}>
      {travel && travel.length > 0 && (
        <ScrollView>
            {travel.map((data, i) => (
              <TravelCard
                key={i}
                navigation={navigation}
                travel={data}
                onClick={onClick}
              />
            ))}
        </ScrollView>
      )}
      <ButtonLarge title="Ajouter un nouveau voyage" icon="plus" onClick={handleNewTravel}/>
    </View>
  );
}


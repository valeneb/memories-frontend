import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InputHour() {
  const [time, setTime] = useState('00:00');

  const handleTimeChange = (text) => {
    // Texte conforme au format HH:mm
    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(text) || text === '') {
      setTime(text); // Mise à jour de l'heure localement
    }
  };

  return (
    <View
      style={tw`bg-[#D9D9D9] text-black rounded-[.625rem] mb-[.6rem] w-[80%]`}
    >
      <TouchableOpacity
        style={tw`p-[.2rem] flex items-center flex-row justify-between`}
      >
        <TextInput
          value={time}
          onChangeText={handleTimeChange}
          placeholder="HH:mm"
          style={tw`p-[.2rem] flex items-center flex-row justify-between mx-[.6rem]`}
        />
        <FontAwesome name="hourglass" size={16} style={tw`mx-[.6rem]`} />
      </TouchableOpacity>
    </View>
  );
}

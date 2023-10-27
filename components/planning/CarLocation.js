import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Input from '../Input';
import InputDate from '../InputDate';
import ButtonUD from './ButtonUD';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

export default function CarLocation() {
  //MANQUE LA GESTION DU BOUTON FONTAWESOME LIGNE 17 où il faut faire un menu

  return (
    <View style={tw`w-11/12 h-auto bg-[#f7ebda] rounded-[.625rem] p-3`}>
      <View style={tw`flex-row mb-3 items-center justify-between`}>
        <Text style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}>
          Location de voiture
        </Text>
        <ButtonUD />
      </View>
      <View style={tw`flex-row mb-3 justify-start`}>
        <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>Du</Text>
        <InputDate size="small" placeholder="Début" />
        <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>au</Text>
        <InputDate size="small" placeholder="Fin" />
      </View>
      <View style={tw`flex-row mb-3 justify-start text-center`}>
        <View>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Agence :
          </Text>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Notes :
          </Text>
        </View>
        <View style={tw`flex-1`}>
          <Input size="small" placeholder="Nom de l'agence" />
          <Input size="small" placeholder="Commentaire" />
        </View>
      </View>
    </View>
  );
}

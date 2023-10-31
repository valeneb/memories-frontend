import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Input from '../Input';
import InputHour from './InputHour';
import InputDate from '../InputDate';
import ButtonUD from './ButtonUpdateDelete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

export default function Flights() {
  const [isEditing, setIsEditing] = useState(true);
  const [departureFlight, setDepartureFlight] = useState('');
  const [hourFlight, setHourFlight] = useState('');
  const [seatNumberFlight, setSeatNumberFlight] = useState('');
  const [compagnyFlight, setCompagnyFlight] = useState('');
  const [notesFlight, setNotesFlight] = useState('');

  const handleValidation = () => {
    // à compléter
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    setIsEditing(!isEditing);
    // à compléter pour l'envois d'infos
  };

  const handleDelete = () => {
    alert('Delete Action');
    // Mettez en place la logique de suppression ici
  };

  return (
    <View style={tw`w-11/12 h-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
      <View style={tw`flex-row mb-3 items-center justify-between`}>
        <Text style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}>
          Billet d'avion
        </Text>
        {isEditing ? (
          <FontAwesome
            name="check"
            color="#073040"
            size={24}
            onPress={handleValidation}
            isEditing={isEditing}
          />
        ) : (
          <ButtonUD
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            isEditing={isEditing}
          />
        )}
      </View>

      {isEditing ? (
        <View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Le
            </Text>
            <InputDate
              size="small"
              placeholder="Departure"
              value={departureFlight}
              onChangeText={setDepartureFlight}
            />
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>à</Text>
            <InputHour value={hourFlight} onChangeText={setHourFlight} />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Siège
            </Text>
            <Input
              size="small"
              placeholder="Siège"
              value={seatNumberFlight}
              onChangeText={setSeatNumberFlight}
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Vol
            </Text>
            <Input
              size="small"
              placeholder="Compagnie / Vol"
              value={compagnyFlight}
              onChangeText={setCompagnyFlight}
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Notes
            </Text>
            <Input
              size="small"
              placeholder="Commentaire"
              value={notesFlight}
              onChangeText={setNotesFlight}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Le
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.departure}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>à</Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.hour}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Siège
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.seatNumber}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Vol
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.compagny}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Notes
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.notes}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

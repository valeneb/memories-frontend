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
  const [inputValues, setInputValues] = useState({
    departure: '',
    hour: '',
    seatNumber: '',
    compagny: '',
    notes: '',
  });

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
    <View style={tw`w-[90%] m-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
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
      <View>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Le
          </Text>
          {isEditing ? (
            <InputDate
            size="small"
            placeholder="Departure"
            value={inputValues.departure}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, departure: text })
            }
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.departure}
            </Text>
          )}
        </View>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>à</Text>
          {isEditing ? (
            <InputHour />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.hour}
            </Text>
          )}
        </View>

        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Siège
          </Text>
          {isEditing ? (
            <Input
            size="small"
            placeholder="Siège"
            value={inputValues.seatNumber}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, seatNumber: text })
            }
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.seatNumber}
            </Text>
          )}
        </View>

        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Vol
          </Text>
          {isEditing ? (
            <Input
            size="small"
            placeholder="Compagnie / Vol"
            value={inputValues.compagny}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, compagny: text })
            }
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.compagny}
            </Text>
          )}
        </View>

        <View style={tw`flex-row ${isEditing ? 'justify-around' : 'justify-between'}  items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Notes :
          </Text>
          {!isEditing ? (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.notes}
            </Text>
          ) : (
            <Input
            size="small"
            placeholder="Commentaire"
            value={inputValues.notes}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, notes: text })
            }
            multiline
            />
          )}
        </View>
      </View>
    </View>
  );
}

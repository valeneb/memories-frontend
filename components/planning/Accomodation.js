import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Input from '../Input';
import InputDate from '../InputDate';
import ButtonUD from './ButtonUD';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

export default function Accomodation() {
  const [isEditing, setIsEditing] = useState(true);
  const [inputValues, setInputValues] = useState({
    arrival: '',
    departure: '',
    address: '',
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
    <View style={tw`w-11/12 h-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
      <View style={tw`flex-row mb-3 items-center justify-between`}>
        <Text style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}>
          Logement
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
              Du
            </Text>
            <InputDate
              size="small"
              placeholder="Arrivée"
              value={inputValues.arrival}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, arrival: text })
              }
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>au</Text>
            <InputDate
              size="small"
              placeholder="Départ"
              value={inputValues.departure}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, departure: text })
              }
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Adresse
            </Text>
            <Input
              size="small"
              placeholder="Adresse du logement"
              value={inputValues.address}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, adress: text })
              }
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Notes
            </Text>
            <Input
              size="small"
              placeholder="Commentaire"
              value={inputValues.notes}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, notes: text })
              }
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Du
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.arrival}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>au</Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.departure}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Adresse
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.address}
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

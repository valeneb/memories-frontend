import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Input from '../Input';
import InputDate from '../InputDate';
import ButtonUD from './ButtonUpdateDelete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

export default function Other() {
  const [isEditing, setIsEditing] = useState(true);
  const [inputValues, setInputValues] = useState({
    activity: '',
    date: '',
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
    <View style={tw`w-[90%] m-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
        <View style={tw`flex flex-row mb-3 items-center justify-between`}>
          {isEditing ? (
            <Input
              size="small"
              style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}
              placeholder="Nom de l'activité"
              value={inputValues.activity}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, activity: text })
              }
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.activity}
            </Text>
          )}
          {isEditing ? (
            <View style={tw`flex items-center p-[.5rem]`}>
              <FontAwesome
                name="check"
                color="#073040"
                size={24}
                onPress={handleValidation}
                isEditing={isEditing}
              />
            </View>
          ) : (
            <ButtonUD
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              isEditing={isEditing}
            />
          )}
        </View>

        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Date
          </Text>
          {isEditing ? (
            <InputDate
              size="small"
              placeholder="Sélectionner une date"
              value={inputValues.date}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, date: text })
              }
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.date}
            </Text>
          )}
        </View>

        <View style={tw`flex-row ${isEditing ? 'justify-around' : 'justify-between'} items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Adresse
          </Text>
          {isEditing ? (
            <Input
              size="small"
              placeholder="Nom de l'agence"
              value={inputValues.address}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, address: text })
              }
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.address}
            </Text>
          )}
        </View>

        <View style={tw`flex-row ${isEditing ? 'justify-around' : 'justify-between'}  items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Notes :
          </Text>
          {isEditing ? (
            <Input
              size="small"
              placeholder="Commentaire"
              value={inputValues.notes}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, notes: text })
              }
              multiline
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.notes}
            </Text>
          )}
        </View>
    </View>
  );
}

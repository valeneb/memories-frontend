import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Input from '../Input';
import InputDate from '../InputDate';
import ButtonUD from './ButtonUD';
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
    <View style={tw`w-11/12 h-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
      {isEditing ? (
        <View>
          <View style={tw`flex-row mb-3 items-center justify-between`}>
            <Input
              size="small"
              style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}
              placeholder="Nom de l'activité"
              value={inputValues.activity}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, activity: text })
              }
            />
            <FontAwesome
              name="check"
              color="#073040"
              size={24}
              onPress={handleValidation}
              isEditing={isEditing}
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Date
            </Text>
            <InputDate
              size="small"
              placeholder="Sélectionner une date"
              value={inputValues.date}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, date: text })
              }
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Adresse
            </Text>
            <Input
              size="small"
              placeholder="Nom de l'agence"
              value={inputValues.address}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, address: text })
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
          <View style={tw`flex-row mb-3 items-center justify-between`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.activity}
            </Text>
            <ButtonUD
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              isEditing={isEditing}
            />
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Date
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.date}
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

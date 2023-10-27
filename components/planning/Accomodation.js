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
    debut: '',
    fin: '',
    address: '',
    notes: '',
  });

  const handleValidation = () => {
    // à compléter
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    alert('Update Action');
    setIsEditing(!isEditing);
    // à compléter pour l'envois d'infos
  };

  const handleDelete = () => {
    alert('Delete Action');
    // Mettez en place la logique de suppression ici
  };

  return (
    <View style={tw`w-11/12 h-auto bg-[#f7ebda] rounded-[.625rem] p-3`}>
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
          <View style={tw`flex-row mb-3 justify-start`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Du
            </Text>
            <InputDate
              size="small"
              placeholder="Début"
              value={inputValues.debut}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, debut: text })
              }
            />
            <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>au</Text>
            <InputDate
              size="small"
              placeholder="Fin"
              value={inputValues.fin}
              onChangeText={(text) =>
                setInputValues({ ...inputValues, fin: text })
              }
            />
          </View>

          <View style={tw`flex-row mb-3 justify-start text-center`}>
            <View>
              <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
                Adresse :
              </Text>
              <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
                Notes :
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Input
                size="small"
                placeholder="Nom de l'agence"
                value={inputValues.nomAgence}
                onChangeText={(text) =>
                  setInputValues({ ...inputValues, nomAgence: text })
                }
              />
              <Input
                size="small"
                placeholder="Commentaire"
                value={inputValues.commentaire}
                onChangeText={(text) =>
                  setInputValues({ ...inputValues, commentaire: text })
                }
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View style={tw`flex-row mb-3 justify-start`}>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              Du
            </Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.debut}
            </Text>
            <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>au</Text>
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {inputValues.fin}
            </Text>
          </View>

          <View style={tw`flex-row mb-3 justify-start text-center`}>
            <View>
              <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
                Adresse :
              </Text>
              <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
                Notes :
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
                {inputValues.address}
              </Text>
              <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
                {inputValues.notes}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

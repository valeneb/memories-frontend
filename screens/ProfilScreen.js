import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../components/Input';

export default function ProfileScreen() {
  const user = useSelector((state) => state.user.value);

  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(user.account.username);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
 
  console.log('user', user);
  return (
    <View style={tw`w-full h-full bg-[#D8725B] pt-[6rem] flex items-center`}>
      <View style={tw`w-full flex flex-col items-center`}>
        <TouchableOpacity style={tw`p-[2rem] bg-white/60 rounded-full flex items-center`}>
          <FontAwesome name="user" size={48} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex items-center`}>
          <TextInput style={tw`${isEdit ? '' : 'text-bold'} my-[1rem] text-white text-[1rem]`} value={username} editable={isEdit} onChangeText={(value) => setUsername(value)}/>
        </TouchableOpacity>
      </View>
      <View style={tw`mt-[1rem]`}>
        <Text style={tw`text-[1.3rem] text-white mb-[1.5rem]`}>Mes informations personnelles</Text>
        <View stylz={tw`w-full flex flex-col items-center`}>
          <Input 
            value={firstname}
            setValue={setFirstname}
            placeholder="Prénom"
            size="normal"
          />
          <Input 
            value={lastname}
            setValue={setLastname}
            placeholder="Nom de famille"
            size="normal"
          />
          <Input 
            value={email}
            setValue={setEmail}
            placeholder="Email"
            size="normal"
          />
        </View>
      </View>
      <View style={tw`mt-[1rem] w-full flex items-center flex-col`}>
        <Text style={tw`text-[1.3rem] text-white mb-[1.5rem]`}>Supprimer mon compte</Text>
        <View style={tw`flex flex-row items-center justify-between w-full px-[1rem] mb-[1rem]`}>
          <Text style={tw`mr-[.5rem]`}>Check</Text>
          <Text style={tw`w-[85%] text-justify`}>
            Je confirme vouloir supprimer mon compte.
            Cette action est irréversible. 
            Toutes les données transmise seront supprimées de nos serveurs.
          </Text>
        </View>
        <TouchableOpacity style={tw`w-[80%] flex items-center bg-[#D9D9D9] rounded-[.625rem] p-[.625rem]`}>
          <Text style={tw`text-black`}>Confirmer la suppression du compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

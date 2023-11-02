import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Input from '../Input';
import InputDate from '../InputDate';
import ButtonUD from '../ButtonUpdateDelete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { formattedDate } from '../../utils/functions';
//import {API_KEY} from '@env';
import { useDispatch } from 'react-redux';
import { deletePlanning, updatePlanning } from '../../reducers/planning';

const API_KEY='http://192.168.1.59:3000';

export default function CarLocation({infos, travelId}) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(!infos._id);

  const [startDate, setStartDate] = useState(infos.rentalStart ? formattedDate(infos.rentalStart) : '');
  const [endDate, setEndDate] = useState(infos.rentalEnd ? formattedDate(infos.rentalEnd) : '');
  const [agency, setAgency] = useState(infos.rentalCompany || '');
  const [notes, setNotes] = useState(infos.comments || '');

  const sendInfos = (infosToSend) => {
    let route = infos._id ? `updateCarRental?travelId=${travelId}&carRentalId=${infos._id}` : `newCar?_id=${travelId}`;
    let method = infos._id ? 'PUT' : 'POST';

    fetch(`${API_KEY}/car/${route}`, {
      method: method,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: infosToSend,
    })
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      if(data.result) {
        setIsEditing(false);
        dispatch(updatePlanning({category: "carRentals", updatedData: data.travel}))
      }
    })
  };

  const handleValidation = () => {
    const formData = new FormData();

    if (startDate !== infos.rentalStart) {
      formData.append('rentalStart', startDate);
    }
    
    if (endDate !== infos.rentalEnd) {
      formData.append('rentalEnd', endDate);
    }

    if (agency !== infos.rentalCompany) {
      formData.append('rentalCompany', agency);
    }

    if (notes !== infos.comments) {
      formData.append('comments', notes);
    }

    sendInfos(formData);
  };

  const handleUpdate = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    fetch(`${API_KEY}/car/deleteCarRental?travelId=${travelId}&carRentalId=${infos._id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      dispatch(deletePlanning({ category: "carRentals", idToDelete: infos._id }));
    })
  };

  return (
    <View style={tw`w-[90%] m-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
      <View style={tw`flex-row mb-3 items-center justify-between`}>
        <Text style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}>
          Location de voiture
        </Text>
        {isEditing ? (
           <View style={tw`flex items-end mt-[.5rem]`}>
            <TouchableOpacity
              style={tw`bg-[#073040] flex items-center py-[.3rem] px-[.5rem] rounded-[.5rem]`}
              onPress={handleValidation}
            >
              <FontAwesome name="check" size={16} color="#F2DCC2" />
            </TouchableOpacity>
          </View>
        ) : (
          <ButtonUD
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            isEditing={isEditing}
          />
        )}
      </View>

      <View>
        <View style={tw`flex flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Du
          </Text>
          {!isEditing ? (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {startDate}
            </Text>
          ) : (
            <InputDate
            size="small"
            placeholder="Début"
            value={startDate}
            setValue={setStartDate}
            />
          )}
        </View>

        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>au</Text>
          {!isEditing ? (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {endDate}
            </Text>
          ) : (
            <InputDate
            size="small"
            placeholder="Fin"
            value={endDate}
            setValue={setEndDate}
            />
          )}
        </View>

        <View style={tw`flex flex-row ${isEditing ? 'justify-around' : 'justify-between'} items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Agence :
          </Text>
          {!isEditing ? (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {agency}
            </Text>
          ) : (
            <Input
              size="small"
              placeholder="Nom de l'agence"
              value={agency}
              setValue={setAgency}
            />
          )}
        </View>

        <View style={tw`flex-row ${isEditing ? 'justify-around' : 'justify-between'}  items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Notes :
          </Text>
          {!isEditing ? (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {notes}
            </Text>
          ) : (
            <Input
            size="small"
            placeholder="Commentaire"
            value={notes}
            setValue={setNotes}
            multiline
            />
          )}
        </View>
      </View>
    </View>
  );
}

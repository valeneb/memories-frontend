import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Input from '../Input';
import InputHour from './InputHour';
import InputDate from '../InputDate';
import ButtonUD from './ButtonUpdateDelete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import {API_KEY} from '@env';
import { useDispatch } from 'react-redux';
import { deletePlanning, updatePlanning } from '../../reducers/planning';

export default function Flights({infos, travelId}) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(!infos._id);

  const [departureAirport, setDepartureAirport] = useState(infos.departureAirport);
  const [arrivalAirport, setArrivalAirport] = useState(infos.arrivalAirport);
  const [departureDate, setDepartureDate] = useState(infos.departureDate);
  const [departureTime, setDepartureTime] = useState(infos.departureTime);
  const [flightNumber, setFlightNumber] = useState(infos.flightNumber);
  const [notes, setNotes] = useState(infos.comments);

  const sendInfos = (infosToSend) => {
    let route = infos._id ? `updateFlight?travelId=${travelId}&flightId=${infos._id}` : `newFlight?_id=${travelId}`;
    let method = infos._id ? 'PUT' : 'POST';

    fetch(`${API_KEY}/flight/${route}`, {
      method: method,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: infosToSend,
    })
    .then(response => response.json())
    .then(data => {
      if(data.result) {
        setIsEditing(false);
        dispatch(updatePlanning({category: "flights", updatedData: data.flights}))
      }
    })
  };

  const handleValidation = () => {
    const formData = new FormData();

    if (departureAirport !== infos.departureAirport) {
      formData.append('departureAirport', departureAirport);
    }
    
    if (arrivalAirport !== infos.arrivalAirport) {
      formData.append('arrivalAirport', arrivalAirport);
    }

    if (departureDate !== infos.departureDate) {
      formData.append('departureDate', departureDate);
    }

    if (departureTime !== infos.departureTime) {
      formData.append('departureTime', departureTime);
    }

    if (flightNumber !== infos.flightNumber) {
      formData.append('flightNumber', flightNumber);
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
    fetch(`${API_KEY}/flight/deleteFlight?travelId=${travelId}&flightId=${infos._id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      dispatch(deletePlanning({ category: "flights", idToDelete: infos._id }));
    })
  };
  return (
    <View style={tw`w-[90%] m-auto bg-[#f7ebda] rounded-[.625rem] p-2 mt-3`}>
      <View style={tw`flex-row mb-3 items-center justify-between`}>
        <Text style={[tw`font-bold text-[1rem] p-2`, { color: '#073040' }]}>
          Billet d'avion
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
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            De
          </Text>
          {isEditing ? (
            <Input
            size="small"
            placeholder="Aéroport de départ"
            value={departureAirport}
            setValue={setDepartureAirport}
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {departureAirport}
            </Text>
          )}
        </View>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            À
          </Text>
          {isEditing ? (
            <Input
            size="small"
            placeholder="Aéroport d'arrivée"
            value={arrivalAirport}
            setValue={setArrivalAirport}
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {arrivalAirport}
            </Text>
          )}
        </View>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
            Le
          </Text>
          {isEditing ? (
            <InputDate
            size="small"
            placeholder="Departure"
            value={departureDate}
            setValue={setDepartureDate}
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {departureDate}
            </Text>
          )}
        </View>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={[tw`text-[1rem] p-2`, { color: '#073040' }]}>à</Text>
          {isEditing ? (
            <InputHour value={departureTime} setValue={setDepartureTime}/>
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {departureTime}
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
            placeholder="Numéro de vol"
            value={flightNumber}
            setValue={setFlightNumber}
            />
          ) : (
            <Text style={[tw`text-[0.9rem] p-2`, { color: '#073040' }]}>
              {flightNumber}
            </Text>
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

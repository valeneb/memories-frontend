import { View, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import Input from '../Input';
import InputDate from '../InputDate';
import { useState } from 'react';
import ButtonLarge from '../ButtonLarge';
import { useDispatch, useSelector } from 'react-redux';
import { addTravel } from '../../reducers/travel';

const ROUTE_BACK = "http://192.168.1.154:3000";

export default function NewTravel({navigation, newTravelName}) {
 const dispatch = useDispatch();
 const user = useSelector((state) => state.user.value);

 const [destination, setDestination] = useState(newTravelName ? newTravelName : '');
 const [departureDate, setDepartureDate] = useState('');
 const [returnDate, setReturnDate] = useState('');

 const handleAddImage = () => {
    console.log('handle');
 }

 const createNewTravel = (latitude, longitude) => {
   fetch(`${ROUTE_BACK}/travel/newTravel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, latitude: latitude, longitude: longitude, destination: destination, departure: departureDate, return: returnDate}),
   })
   .then (response => response.json())
   .then(data => {
         if(data.result) {
            dispatch(addTravel(data.trip));
            navigation.navigate('Travel', {travelId: data.trip._id});
         }
   })
 };

 const handleCreateNewTravel = () => {
   if(destination && departureDate && returnDate) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}&limit=1`)
      .then(response => response.json())
      .then((data) => {
         const latitute = data[0].lat;
         const longitude = data[0].lon;
         if (latitute && longitude) {
            createNewTravel(latitute, longitude);
         }
      });
   }
 }

 return (
   <SafeAreaView style={tw`w-full h-full flex flex-col items-center justify-between`}>
      <View style={tw`w-full flex flex-col items-center mt-[4rem]`}>
        <Input value={destination} setValue={setDestination} placeholder="Destination" size='normal' />
        <InputDate size="normal" placeholder="Date de départ" marginTop value={departureDate} setValue={setDepartureDate}/>
        <InputDate size="normal" placeholder="Date de retour" marginTop value={returnDate} setValue={setReturnDate}/>
        <ButtonLarge icon="plus" title="Ajout image de couverture" onClick={handleAddImage} image />
      </View>
      <ButtonLarge title="Créer un nouveau voyage" icon="check" onClick={handleCreateNewTravel} />
   </SafeAreaView>
 );
}
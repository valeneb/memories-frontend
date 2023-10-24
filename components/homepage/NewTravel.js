import { View } from 'react-native';
import tw from 'twrnc';
import Input from '../Input';
import InputDate from '../InputDate';
import { useState } from 'react';
import ButtonLarge from '../ButtonLarge';



export default function NewTravel() {
 const [destination, setDestination] = useState('');
 const [departureDate, setDepartureDate] = useState('');
 const [returnDate, setReturnDate] = useState('');

 const handleAddImage = () => {
    console.log('handle');
 }

 return (
    <View style={tw`w-full flex flex-col items-center mt-[4rem]`}>
        <Input value={destination} setValue={setDestination} placeholder="Destination" size='normal' />
        <InputDate size="normal" placeholder="Date de départ" marginTop value={departureDate} setValue={setDepartureDate}/>
        <InputDate size="normal" placeholder="Date de retour" marginTop value={returnDate} setValue={setReturnDate}/>
        <ButtonLarge icon="plus" title="Ajout image de couverture" onClick={handleAddImage} image />
    </View>
 );
}
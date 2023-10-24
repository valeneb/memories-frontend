import { View } from 'react-native';
import tw from 'twrnc';
import Input from '../Input';
import InputDate from '../inputDate/InputDate';
import { useState } from 'react';



export default function NewTravel() {
 const [destination, setDestination] = useState('');
 const [departureDate, setDepartureDate] = useState(new Date())
 const [open, setOpen] = useState(false)

 return (
    <View style={tw`w-full flex flex-col items-center mt-[2rem]`}>
        <Input value={destination} setValue={setDestination} placeholder="Destination" size='normal' />
        <InputDate />
    </View>
 );
}
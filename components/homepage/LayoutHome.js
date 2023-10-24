import { View, Text } from 'react-native';
import tw from 'twrnc';
import NewTravel from './NewTravel';

export default function LayoutHome({children}) {
 return (
    <View style={tw`w-full flex flex-col items-center`}>
        <Text style={tw`text-[1.375rem] font-bold text-[#073040]`}>Mes voyages</Text>
        <View style={tw`h-0.5 bg-[#073040] w-[80%] mt-[1rem]`} />
        {children}
    </View>
 );
}
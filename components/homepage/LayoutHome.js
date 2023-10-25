import { View, Text } from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';

export default function LayoutHome({children, type, onClick}) {
 const title = type === 'new' ? 'Nouveau voyage' : 'Mes voyages';
 const buttonTitle = type === 'new' ? 'Créer un nouveau voyage' : 'Ajouter un nouveau voyage';
 const icon = type === 'new' ? 'check' : 'plus';

 return (
    <View style={tw`w-full h-full flex flex-col items-center`}>
        <View style={tw`w-full flex items-center`}>
            <Text style={tw`text-[1.375rem] font-bold text-[#073040]`}>{title}</Text>
            <View style={tw`h-0.5 bg-[#073040] w-[80%] mt-[1rem]`} />
        </View>
        <View style={tw`w-full h-[70%] flex items-center justify-between`}>
            {children}
            <ButtonLarge title={buttonTitle} icon={icon} onClick={onClick}/>
        </View>
    </View>
 );
}
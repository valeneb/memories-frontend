import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';

export default function Input({
 value,
 setValue,
 placeholder,
 border,
 size,
 error,
 setError,
}) {
 const inputHeight = () => {
    switch (size) {
    default:
    case "normal":
        return "h-[2.5rem]";
    case "small":
        return "h-[2rem]";
    case "large":
        return "h-[3rem]";
    };
 };

 const errorMessages = {
    Email: 'Veuillez saisir une adresse mail valide.',
    Password: 'Mot de passe incorrect.',
    'Confirm Password': 'Le mot de passe est différent.',
    Firstname: 'Veuillez saisir un prénom.',
    Lastname: 'Veuillez saisir un nom de famille.',
    Username: 'Pseudo incorrect.',
 };

 return (
    <View style={tw`w-[80%] ${size === "large" ? "mb-[1.6rem]" : "mb-[.6rem]"}`}>
        <TextInput
        style={tw`${border ? 'border border-black' : ''} ${size === "large" ? 'text-center' : 'pl-[.5rem]'} bg-[#D9D9D9] text-black rounded-[.625rem] ${inputHeight()}`}
        placeholder={placeholder}
        onChangeText={(value) => {
            if(error) {
                setError('');
            }
            setValue(value);
        }} 
        value={value}
        secureTextEntry={placeholder === "Password" || placeholder === "Confirm Password"}
        />
        {error && error === placeholder &&  <Text style={tw`text-red-700 pb-[.5rem] font-bold`}>*{errorMessages[error]}</Text>}
    </View>
 );
}
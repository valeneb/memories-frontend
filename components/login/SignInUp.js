import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';

export default function SignInUp({register, setIsLogin}) {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');

 const [error, setError] = useState('');

 const comparePasswords = () => {
    return password === confirmPassword;
 }

 const checkEmail = () => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
};

 const signIn = () => {
    if (username && password) {
        console.log('fetch connect');
    } else {
        setError(!email ? 'Email' : 'Password');
    }
 };

 const registerInfosIsOk = checkEmail() && comparePasswords() && password && confirmPassword && lastName && firstName && username;

 const signUp = () => {
    if (registerInfosIsOk) {
        console.log('fetch connect');
    } else {
        if (!checkEmail()) {
            setError('Email');
        }
        if (!comparePasswords()) { 
            setError('Confirm Password');
        }
        if(!username) {
            setError('Username');
        }
        if(!password) {
            setError('Password');
        }
        if(!firstName) {
            setError('Firstname');
        }
        if(!lastName) {
            setError('Lastname');
        }
        if(!username) {
            setError('Username');
        }
    }
 };

 const handleConnect = () => {
    if(register) {
        signUp();
    } else {
        signIn();
    }
 };

 return (
    <View style={tw`flex items-center justify-center w-full h-full bg-[#D8725B] p-[1rem]`}>
      <Image source={require('../../assets/logo-blanc-hd.png')} style={tw`w-[22rem] h-[22rem] opacity-70 relative`} />
      <View style={tw`absolute w-full h-full flex flex-col items-center justify-around`}>
        <View style={tw`flex flex-col w-full items-center h-[45%] justify-center`}>
            <Input value={username} setValue={setUsername} placeholder="Username" size={register ? 'normal' : 'large'} border/>
            <Input value={password} setValue={setPassword} placeholder="Password" size={register ? 'normal' : 'large'} border/>
        </View>
        <View style={tw`w-full flex flex-row items-center justify-center`}>
            <View style={tw`w-[45%] h-px bg-black`}/>
            <Text style={tw`px-[1rem] text-[1.25rem]`}>OU</Text>
            <View style={tw`w-[45%] h-px bg-black`} />
        </View>
        <View style={tw`flex flex-col w-full items-center justify-center h-[45%] pt-[1.6rem]`}>
            <Input value={username} setValue={setUsername} placeholder="Username" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
            {register && (
                <>
                    <Input value={firstName} setValue={setFirstName} placeholder="Firstname" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
                    <Input value={lastName} setValue={setLastName} placeholder="LastName" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
                    <Input value={email} setValue={setEmail} placeholder="Email" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
                </>
            )}
            <Input value={password} setValue={setPassword} placeholder="Password" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
            {register && (
                <Input value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirm Password" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
            )}
            <Button title="Connect" onClick={handleConnect} marginTop={register}/>
        </View>
      </View>  
    </View>
 );
}
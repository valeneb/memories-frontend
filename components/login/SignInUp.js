import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Input from '../Input';
import Button from '../Button';
import { useState, useEffect } from 'react';

import 'expo-dev-client';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function SignInUp({register, setRegister}) {
 GoogleSignin.configure({
    webClientId: '779362993332-pneuafjhb61crsnnuuac83ebo99kbmcq.apps.googleusercontent.com',
  });

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


 const handleGoogleConnect = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user', userInfo);
    } catch (error) {
      console.log('error', error);
    }
  };

 return (
    <View style={tw`flex items-center justify-center w-full h-full bg-[#D8725B] p-[1rem]`}>
      <Image source={require('../../assets/logo-blanc-hd.png')} style={tw`w-[22rem] h-[22rem] opacity-70 relative`} />
      <View style={tw`absolute w-full h-full flex flex-col items-center justify-around`}>
        <View style={tw`flex flex-col w-full items-center h-[45%] justify-center`}>
            <GoogleSigninButton onPress={handleGoogleConnect} style={tw`rounded-[.75rem] h-[3.5rem] w-[80%]`} />
            <TouchableOpacity style={tw`p-[.5rem]`} onPress={() => setRegister(!register)}>
                <Text>{register ? 'Déjà un compte ? Cliquez ici' : 'Pas encore de compte ? Cliquez ici'}</Text>
            </TouchableOpacity>
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
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectUser } from '../../reducers/user';
import {API_KEY} from '@env'

export default function SignInUp({register, setRegister, navigation}) {
 const dispatch = useDispatch();

 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [firstname, setFirstname] = useState('');
 const [lastname, setLastname] = useState('');
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
    if (checkEmail() && password) {
        fetch(`${API_KEY}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password}),
        })
        .then (response => response.json())
        .then(data => {
            if (data.user) {
                dispatch(connectUser(data.user));
                navigation.navigate('TabNavigator');
            }
        })
    } else {
        setError(!password ? 'Password' : 'Email');
    }
 };

 const registerInfosIsOk = checkEmail() && comparePasswords() && password && confirmPassword && lastname && firstname && username;

 const signUp = () => {
    console.log('ici');
    if (registerInfosIsOk) {
        fetch(`${API_KEY}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username, firstname, lastname}),
        })
        .then (response => response.json())
        .then(data => {
            if (data.user) {
                dispatch(connectUser(data.user));
                navigation.navigate('TabNavigator');
            }
        })
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
        if(!firstname) {
            setError('Firstname');
        }
        if(!lastname) {
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
            <Input placeholder="Connect with Google" size={register ? 'normal' : 'large'} border/>
            <Input placeholder="Connect with Facebook" size={register ? 'normal' : 'large'} border/>
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
            {register && (
                <>
                    <Input value={username} setValue={setUsername} placeholder="Username" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
                    <Input value={firstname} setValue={setFirstname} placeholder="Firstname" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
                    <Input value={lastname} setValue={setLastname} placeholder="LastName" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
                </>
            )}
            <Input value={email} setValue={setEmail} placeholder="Email" size={register ? 'normal' : 'large'} border error={error} setError={setError}/>
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
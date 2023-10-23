import { useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import Login from '../components/login/Login';
import SignInUp from '../components/login/SignInUp';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState(false);

  const onClick = (value) => {
    setRegister(value === 'Sign up');
    setIsLogin(false);
  };

  return (
    <View
      style={tw`flex flex-col items-center justify-center w-full h-full bg-[#D8725B] p-[1rem]`}
    >
      {isLogin ? (
        <Login onClick={onClick} />
      ) : (
        <SignInUp register={register} setIsLogin={setIsLogin} />
      )}
    </View>
  );
}

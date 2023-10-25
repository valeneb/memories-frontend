import { Text, View } from 'react-native';
import Header from '../components/Header';
import { useState } from 'react';
import tw from 'twrnc';

export default function TravelScreen() {
  const [isDairyActive, setIsDairyActive] = useState(false);

  const onClick = (title) => {
    console.log('title', title);
  };
  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      <Header title="Brazil" icon="edit" onClick={onClick} isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} />
      <Text>Profile Screen</Text>
    </View>
  );
}
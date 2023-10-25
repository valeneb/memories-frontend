import { Text, View } from 'react-native';
import { useState } from 'react';
import tw from 'twrnc';
import Diary from '../components/diary/Diary';

export default function TravelScreen() {
  const [isDairyActive, setIsDairyActive] = useState(true);
  
  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      {isDairyActive ? (
        <Diary isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} />
      ) : (
        <Text>Program Screen</Text>
      )}
    </View>
  );
}
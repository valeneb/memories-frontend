import { Text, View } from 'react-native';
import { useState } from 'react';
import tw from 'twrnc';
import Diary from '../components/diary/Diary';
import Planning from '../components/planning/Planning';

export default function TravelScreen() {
  const [isDairyActive, setIsDairyActive] = useState(false);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      {isDairyActive ? (
        <Diary
          isDairyActive={isDairyActive}
          setIsDairyActive={setIsDairyActive}
        />
      ) : (
        <Planning />
      )}
    </View>
  );
}

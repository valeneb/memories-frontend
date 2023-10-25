import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import tw from 'twrnc';
import Diary from '../components/diary/Diary';
import { useSelector } from 'react-redux';

export default function TravelScreen({ route }) {
  const { travelId } = route.params;
  const travel = useSelector((state) => state.travel.value);

  const [travelInfos, setTravelInfos] = useState({});
  
  const [isDairyActive, setIsDairyActive] = useState(true);

  useEffect(() => {
    const result = travel.filter(item => item._id === travelId);
    setTravelInfos(result[0]);
  }, []);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      {isDairyActive ? (
        <Diary isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} travel={travelInfos}/>
      ) : (
        <Text>Program Screen</Text>
      )}
    </View>
  );
}
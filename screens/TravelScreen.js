import { View } from 'react-native';
import { useState, useEffect } from 'react';
import tw from 'twrnc';
import Diary from '../components/diary/Diary';
import { useSelector, useDispatch } from 'react-redux';
import Planning from '../components/planning/Planning';
import {
  initPlanning,
  addPlanning,
} from '../reducers/planning';
import { initDiary, addNewDiary } from '../reducers/diary';
//import {API_KEY} from '@env';

const API_KEY='http://192.168.1.59:3000';

export default function TravelScreen({ route }) {
  const dispatch = useDispatch();
  const { travelId } = route.params;
  const travels = useSelector((state) => state.travel.value);

  const [travelInfos, setTravelInfos] = useState({});
  
  const [isDairyActive, setIsDairyActive] = useState(true);

  useEffect(() => {
    const result = travels.filter(item => item._id === travelId);
    setTravelInfos(result[0]);
  }, [travelId]);

  useEffect(() => {
    fetch(`${API_KEY}/travel/planning?travelId=${travelInfos._id}&userId=${travelInfos.user}`)
    .then (response => response.json())
    .then(data => {
        if(data.result) {
          dispatch(initPlanning(data.planning));
        }
        console.log('data', data);
    })
    fetch(`${API_KEY}/diary?_id=${travelInfos._id}`)
    .then (response => response.json())
    .then(data => {
        dispatch(initDiary(data.diaries));
    })
  }, [travelInfos])

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      {isDairyActive ? (
        <Diary isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} travel={travelInfos}/>
      ) : (
        <Planning isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} travel={travelInfos} />
      )}
    </View>
  );
}

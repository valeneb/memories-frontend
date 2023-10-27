import { View, ScrollView } from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import DiaryCard from './DiaryCard';
import Header from '../Header';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { initDiary, addNewDiary } from '../../reducers/diary';

const ROUTE_BACK = "http://192.168.1.154:3000";

export default function Diary({isDairyActive, setIsDairyActive, travel}) {
  const dispatch = useDispatch();
  const diaries = useSelector((state) => state.diary.value);

  const handleNewDiary = () => {
    fetch(`${ROUTE_BACK}/diary/newDiary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title: '', description: '', _id: travel._id}),
    })
    .then (response => response.json())
    .then(data => {
        if(data.result) {
            dispatch(addNewDiary(data.saved));
        }
    })
  };

  useEffect(() => {
    fetch(`${ROUTE_BACK}/diary?_id=${travel._id}`)
    .then (response => response.json())
    .then(data => {
        dispatch(initDiary(data));
    })
  }, [travel._id])

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
        <Header title={travel.destination} id={travel._id} isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} />
        {diaries.length > 0 ? (
            <ScrollView style={tw`bg-[#F2DDC2] w-full h-full`}>
                <View style={tw`w-full h-full p-[.5rem]`}>
                    {diaries.map((diary, index) => {
                        return (
                            <View key={index} style={tw`w-full`}>
                                <DiaryCard diary={diary} travelId={travel._id} photos={[]} />
                            </View>
                        )
                    })}
                </View>            
            </ScrollView>
        ) : (
            <View style={tw`w-full h-[90%] flex items-center justify-center`}>
                <ButtonLarge title="Commencer mon carnet de voyage" onClick={handleNewDiary}/>
            </View>
        )}
    </View>
  );
}
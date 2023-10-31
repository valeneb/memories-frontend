import { View, ScrollView, TouchableOpacity, Text, Keyboard } from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import DiaryCard from './DiaryCard';
import Header from '../Header';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { initDiary, addNewDiary } from '../../reducers/diary';
import {API_KEY} from '@env'

export default function Diary({isDairyActive, setIsDairyActive, travel}) {
  const dispatch = useDispatch();
  const diaries = useSelector((state) => state.diary.value);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleNewDiary = () => {
    fetch(`${API_KEY}/diary/newDiary`, {
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
    fetch(`${API_KEY}/diary?_id=${travel._id}`)
    .then (response => response.json())
    .then(data => {
        dispatch(initDiary(data.diaries));
    })
  }, [travel._id])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
 
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-[80%]`}>
        <Header title={travel.destination} id={travel._id} isDairyActive={isDairyActive} setIsDairyActive={setIsDairyActive} />
        {diaries && diaries.length > 0 ? (
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
        {diaries && diaries.length > 0 && !isKeyboardVisible  && (
            <TouchableOpacity onPress={handleNewDiary} style={tw`p-[1rem] bg-white rounded-[.5rem] w-[30%] m-[1rem]`}>
                <Text>Add</Text>
            </TouchableOpacity>
        )}
    </View>
  );
}
import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { updateDiary, deleteDiary } from '../../reducers/diary';

const ROUTE_BACK = "http://192.168.1.154:3000";

export default function DiaryCard({ diary, photos, travelId}) {
  const dispatch = useDispatch();
  const textRef = useRef();
  const [edit, setEdit] = useState(diary.title === '' && diary.description === '' );
  const [textHeight, setTextHeight] = useState(0);

  const [editTitle, setEditTitle] = useState(diary.title);
  const [editContent, setEditContent] = useState(diary.description);

  const updateTextHeight = () => {
    if (textRef.current) {
      textRef.current.measure((height) => {
        setTextHeight(height);
      });
    }
  };

  const updateInfos = (infos) => {
    fetch(`${ROUTE_BACK}/diary`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(infos),
    })
    .then(response => response.json())
    .then((data) => {
      if(data.result) {
        dispatch(updateDiary(data.diary));
        setEdit(false);
      }
    });
  };


  const handleChange = () => {
    let infos = {_id: diary._id};

    if(diary.title !== editTitle) {
      infos.title = editTitle;
    }

    if(diary.description !== editContent) {
      infos.description = editContent;
    }

    updateInfos(infos);
  };

  const handleDelete = () => {
    fetch(`${ROUTE_BACK}/diary/?_id=${diary._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then (response => response.json())
    .then(data => {
      dispatch(deleteDiary(diary._id))
      setEdit(false);
    })
  };

  return (
    <View>
      {edit && (
        <View style={tw`flex items-end mb-[.3rem]`}>
          <TouchableOpacity style={tw`bg-[#073040] flex items-center p-[.3rem] rounded-[.5rem]`} onPress={handleDelete}>
            <FontAwesome
              name="times"
              size={16}
              color="#F2DCC2"
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={tw`${edit ? 'bg-white/40 rounded-[.5rem]' : 'bg-[#F2DDC2]'} w-full p-[.5rem] mb-[.5rem]`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <TextInput placeholder='Titre' onChangeText={(value) => setEditTitle(value)} style={tw`text-[1rem] text-black ${edit ? 'bg-white p-[.5rem] w-[90%]' : ''}`} editable={edit} value={editTitle} />
          {!edit && (
            <TouchableOpacity style={tw`py-[.5rem]`} onPress={() => setEdit(true)}>
              <FontAwesome
                name="edit"
                size={16}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`flex flex-row w-full items-start pt-[.5rem]`}>
          {!edit && photos.length > 0 && (
            <View style={tw`w-[40%]`}>
              <Image source={require('../../assets/favicon.png')} alt="photo" style={[tw`w-full rounded-[.5rem]`, { height: textHeight }]} />
            </View>
          )}
          <TextInput
            placeholder='Description'
            onChangeText={(value) => setEditContent(value)}
            multiline={true}
            editable={edit}
            ref={textRef}
            onLayout={updateTextHeight}
            style={tw`${photos.length > 0 && !edit ? 'w-[60%] ml-[.5rem]' : 'w-full'} text-black ${edit ? 'h-[10rem] bg-white p-[.5rem]' : ''}`}
            textAlignVertical={`${edit ? 'top': 'middle'}`}
            value={editContent}
          />
        </View>
        {!edit && photos.length > 0 && (
          <View style={tw`flex flex-row items-center w-full pt-[.5rem]`}>     
            <Image source={require('../../assets/favicon.png')} alt="photo" style={tw`rounded-[.5rem] w-[50%] mr-[.5rem]`} />
          </View>
        )} 
        {edit && (
          <View style={tw`flex items-end mt-[.5rem]`}>
            <TouchableOpacity style={tw`bg-[#073040] flex items-center py-[.3rem] px-[.5rem] rounded-[.5rem]`} onPress={handleChange}>
              <FontAwesome
                name="check"
                size={16}
                color="#F2DCC2"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}


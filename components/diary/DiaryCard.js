import React, { useState, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ROUTE_BACK = "http://192.168.1.154:3000";

export default function DiaryCard({ title, photos, content, travelId}) {
  const textRef = useRef();
  const [edit, setEdit] = useState(title === '' && content === '' );
  const [textHeight, setTextHeight] = useState(0);

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const updateTextHeight = () => {
    if (textRef.current) {
      textRef.current.measure((height) => {
        setTextHeight(height);
      });
    }
  };

  const handleDelete = () => {
    console.log('delete diary');
  };

  const handleChange = () => {
    fetch(`${ROUTE_BACK}/diary/newDiary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: editTitle, description: editContent, _id: travelId}),
    })
    .then (response => response.json())
    .then(data => {
      setEdit(false);
      console.log('update change value', data);
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
          <View style={tw`w-[40%]`}>
            <Image source={require('../../assets/favicon.png')} alt="photo" style={[tw`w-full rounded-[.5rem]`, { height: textHeight }]} />
          </View>
          <TextInput
            placeholder='Description'
            onChangeText={(value) => setEditContent(value)}
            multiline={true}
            editable={edit}
            ref={textRef}
            onLayout={updateTextHeight}
            style={tw`w-[60%] ml-[.5rem] text-black ${edit ? 'h-[10rem] bg-white p-[.5rem]' : ''}`}
            textAlignVertical={`${edit ? 'top': 'middle'}`}
            value={editContent}
          />
        </View>
        {!edit ? (
          <View style={tw`flex flex-row items-center w-full pt-[.5rem]`}>
              
                  <Image source={require('../../assets/favicon.png')} alt="photo" style={tw`rounded-[.5rem] w-[50%] mr-[.5rem]`} />
        
              
          </View>
        ) : (
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


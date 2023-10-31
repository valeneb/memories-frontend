import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text, Modal, Button } from 'react-native';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { updateDiary, deleteDiary } from '../../reducers/diary';
import * as ImagePicker from 'expo-image-picker';
import ModalPhotos from './ModalPhotos';
import {API_KEY} from '@env'

export default function DiaryCard({ diary }) {
  const dispatch = useDispatch();
  const textRef = useRef();
  const [edit, setEdit] = useState(diary.title === '' && diary.description === '' );
  const [showModal, setShowModal] = useState(false);
  const [textHeight, setTextHeight] = useState(0);

  const [editTitle, setEditTitle] = useState(diary.title);
  const [editContent, setEditContent] = useState(diary.description);
  const [editPhotos, setEditPhotos] = useState([]);

  const updateTextHeight = () => {
    if (textRef.current) {
      textRef.current.measure((fx, fy, width, height, px, py) => {
        setTextHeight(height);
      });
    }
  };

  const handleAddImage = async() => {
   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

   if (permissionResult.granted === false) {
      alert('Permission d\'accès à la galerie requise');
      return;
   }

   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 9],
      quality: 1,
   });

   if (!result.canceled) {
    setEditPhotos((prev) => [...prev, result.assets[0].uri]);
   }
  };

  const showAllImage = () => {
    setShowModal(true);
  };

  const handleChangeImage = () => {
    if (diary.moment_pictures.length === 0 && editPhotos.length > 0) {
      return true;
    }

    if(diary.moment_pictures .length > 0) {
      for (let i = 0; i < editPhotos.length; i += 1) {
        if (diary.moment_pictures[i] !== editPhotos[i]) {
          return true;
        }
      }
    }

    return false;
  }

  const updateInfos = (infos) => {
    fetch(`${API_KEY}/diary`, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: infos,
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
    const formData = new FormData();

    formData.append('_id', diary._id);

    if(diary.title !== editTitle) {
      formData.append('title', editTitle);
    }

    if(diary.description !== editContent) {
      formData.append('description', editContent);
    }

    if(handleChangeImage()) {
      formData.append('picture', {
        uri: editPhotos[0],
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }

    updateInfos(formData);
  };

  const handleDelete = () => {
    fetch(`${API_KEY}/diary/?_id=${diary._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then (response => response.json())
    .then(data => {
      dispatch(deleteDiary(diary._id))
      setEdit(false)
    })
  };

  useEffect(() => {
    if(diary.moment_pictures.length > 0) {
      const array = [];
      diary.moment_pictures.map(picture => {
        array.push(picture.secure_url)
      })
      setEditPhotos(array);
      updateTextHeight();
    }
  }, [diary]);

  return (
    <View>
      {edit && (
        <View style={tw`flex items-end mb-[.3rem]`}>
          <TouchableOpacity
            style={tw`bg-[#073040] flex items-center p-[.3rem] rounded-[.5rem]`}
            onPress={handleDelete}
          >
            <FontAwesome name="times" size={16} color="#F2DCC2" />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={tw`${
          edit ? 'bg-white/40 rounded-[.5rem]' : 'bg-[#F2DDC2]'
        } w-full p-[.5rem] mb-[.5rem]`}
      >
        <View style={tw`flex flex-row items-center justify-between`}>
          <TextInput
            placeholder="Titre"
            onChangeText={(value) => setEditTitle(value)}
            style={tw`text-[1rem] text-black ${
              edit ? 'bg-white p-[.5rem] w-[90%]' : ''
            }`}
            editable={edit}
            value={editTitle}
          />
          {!edit && (
            <TouchableOpacity style={tw`py-[.5rem]`} onPress={() => {
              setEdit(true);
                }}>
              <FontAwesome
                name="edit"
                size={16}
              />
            </TouchableOpacity>
          )}
        </View>
        {edit && (
          <View style={tw`w-full pt-[.5rem] flex flex-row items-center`}>
            <TouchableOpacity onPress={handleAddImage} style={tw`bg-white h-[8rem] w-[8rem] rounded-[.5rem] flex items-center justify-center`}>
                <FontAwesome
                  name="image"
                  size={98}
                  style={tw`opacity-60`}
                />
                <FontAwesome
                name="plus"
                size={48}
                style={tw`opacity-60 mr-[.5rem] absolute`}
                />
            </TouchableOpacity>
            {editPhotos.length > 0 && (
              <TouchableOpacity onPress={showAllImage} style={tw`h-[8rem] w-[8rem] rounded-[.5rem] ml-[.5rem] flex items-center justify-center`}>
                <Image source={{ uri: editPhotos[editPhotos.length - 1] }} style={tw`w-full h-full rounded-[.5rem]`} resizeMode="cover" />
                {editPhotos.length > 1 && (
                  <View style={tw`flex flex-row absolute items-center`}>
                    <FontAwesome
                    name="plus"
                    size={32}
                    color="white"
                    style={tw`opacity-60 mr-[.5rem]`}
                    />
                    <Text style={tw`text-white text-[2rem] opacity-60 font-bold`}>{editPhotos.length - 1}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={tw`flex flex-row w-full items-start pt-[.5rem]`}>
          {!edit && editPhotos.length > 0 && (
            <View style={[tw`w-[40%] rounded-[.5rem]`, { height: textHeight }]}>
              <Image source={{ uri: editPhotos[0] }} alt="photo" style={[tw`w-full rounded-[.5rem]`, { height: textHeight }]} />
            </View>
          )}
          <TextInput
            placeholder="Description"
            onChangeText={(value) => setEditContent(value)}
            multiline={true}
            editable={edit}
            ref={textRef}
            onLayout={updateTextHeight}
            style={tw`text-black ${edit ? 'h-[10rem] bg-white p-[.5rem] w-full' : `${editPhotos.length > 0 ? 'w-[60%] ml-[.5rem]' : 'w-full'}`}`}
            textAlignVertical={`${edit ? 'top': 'middle'}`}
            value={editContent}
          />
        </View>
        {!edit && editPhotos.length > 0 && (
          <View style={tw`flex flex-row items-center w-full pt-[1rem]`}>     
            <Image source={require('../../assets/favicon.png')} alt="photo" style={tw`rounded-[.5rem] w-[8rem] h-[8rem] mr-[.5rem]`} />
          </View>
        )} 
        {edit && (
          <View style={tw`flex items-end mt-[.5rem]`}>
            <TouchableOpacity
              style={tw`bg-[#073040] flex items-center py-[.3rem] px-[.5rem] rounded-[.5rem]`}
              onPress={handleChange}
            >
              <FontAwesome name="check" size={16} color="#F2DCC2" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ModalPhotos showModal={showModal} setShowModal={setShowModal} editPhotos={editPhotos} setEditPhotos={setEditPhotos} />
    </View>
  );
}

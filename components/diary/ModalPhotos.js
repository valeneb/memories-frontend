import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Modal } from 'react-native';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ModalPhotos({ showModal, setShowModal, editPhotos, setEditPhotos}) {
  const deleteImage = (photoToDelete) => {
    const photos = editPhotos.filter(photo => photo !== photoToDelete);
    setEditPhotos(photos);
  }

  return (
    <Modal transparent={true} animationType="slide" visible={showModal}>
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <View
            style={tw`rounded-[.5rem] bg-white p-[.5rem] flex flex-col w-[90%] h-[80%]`}
            >
            <TouchableOpacity style={tw`mb-[1rem] w-[1.5rem] bg-[#073040] flex items-center p-[.3rem] rounded-[.5rem]`} onPress={() => setShowModal(false)}>
                <FontAwesome
                name="times"
                size={16}
                color="#F2DCC2"
                />
            </TouchableOpacity>
            <View style={tw`w-full flex items-center pb-[1.5rem]`}>
                <Text style={tw`text-[1rem]`}>Cliquez sur l'image si vous souhaitez la supprimer</Text>
            </View>
            <View style={tw`w-full h-full flex flex-row flex-wrap`}>
                {editPhotos.map((photo, index) => {
                return (
                    <TouchableOpacity onPress={() => deleteImage(photo)} key={index} style={tw`h-[8rem] w-[50%] p-[.5rem] rounded-[.5rem] flex items-center justify-center`}>
                    <Image source={{ uri: photo }} style={tw`w-full h-full rounded-[.5rem]`} resizeMode="cover" />
                    </TouchableOpacity>
                )
                })}
            </View>
            </View>
        </View>
    </Modal>
  );
}
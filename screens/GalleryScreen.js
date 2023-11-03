import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux';
import { initAllImages } from '../reducers/allImages';
import ModalBigPhotos from '../components/imagesscreen/ModalBigPhotos';
import Loader from '../components/loaders/Loader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_KEY='http://192.168.1.59:3000';

export default function GalleryScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const images = useSelector((state) => state.allImages.value);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState();

  const handleSearch = (text) => {
    setSearchValue(text);
    const filtered = images.filter(item =>
        item.destinationId.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
};

  const handleShowImage = (photo) => {
    setPhoto(photo);
    setShowModal(!showModal);
  };

  useFocusEffect(
    useCallback(() => {
      const getImages = fetch(`${API_KEY}/allPictures`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Cache-Control': 'no-cache'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setAvatarUrl(data.avatarUrl);
            dispatch(initAllImages(data.allImagesByTravel));
            setFilteredData(data.allImagesByTravel);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      return () => getImages;
    }, [])
  );
  return (
    <SafeAreaView style={tw`items-center bg-[#F2DDC2] flex-1 w-full h-full`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Text style={tw`font-bold text-[1.5rem] m-3 text-[#073040]`}>
            Gallerie
          </Text>
          {filteredData && filteredData.length > 0 ? (
            <>
              <View style={tw`w-full flex items-center mb-[1rem]`}>
                <TextInput
                  style={tw`w-[80%] border border-[#073040] rounded-[.3rem] p-[.5rem]`}
                  placeholder="Rechercher voyage"
                  value={searchValue}
                  onChangeText={handleSearch}
                />
              </View>
              <ScrollView style={tw`w-full h-full px-[.5rem]`}>
                <View style={tw`flex flex-col items-center w-full h-full`}>
                  {filteredData.map((collection, index) => (
                    <View key={index} style={tw`w-full mb-[1rem]`}>
                      <View style={tw`flex flex-row items-center`}>
                        <FontAwesome name="camera-retro" size={24} color="#073040" style={tw`mb-1 pr-[.5rem]`} />
                        <Text style={tw`font-bold text-[#073040] text-[1.5rem] pb-[.5rem]`}>{collection.destinationId}</Text>
                      </View>
                      <View style={tw`flex flex-row items-center w-full flex-wrap`}>
                        {collection.images.map((image, imageIndex) => (
                          <TouchableOpacity key={`${imageIndex}_images`} style={styles.imageContainer} onPress={() => handleShowImage(image)}>
                            <Image source={{ uri: image }} style={styles.image} />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          ) : (
            <View style={tw`items-center flex justify-center w-full h-full`}>
              <Text style={tw`text-[1.5rem]`}>Aucune image</Text>
            </View>
          )}
        </>
      )}
      <ModalBigPhotos showModal={showModal} setShowModal={setShowModal} photo={photo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '50%',
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

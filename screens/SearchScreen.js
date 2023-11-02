import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useSelector } from 'react-redux';

const API_KEY = 'http://192.168.1.13:3000';

export default function SearchScreen() {
  const [images, setImages] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${API_KEY}/allPictures?token=${user.token}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setAvatarUrl(data.avatarUrl);
          setImages(data.allImages);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={tw`items-center bg-[#F2DDC2] flex-1`}>
      <Text style={tw`font-bold text-[1.5rem] m-3 text-[#073040]`}>
        Gallerie
      </Text>
      {images.length > 0 ? (
        <ScrollView contentContainerStyle={styles.container}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={tw`items-center flex-1`}>
          <Text>Aucune image</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '33.3333%',
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

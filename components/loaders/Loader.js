import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import tw from 'twrnc';

export default function Loader() {
  return (
    <View style={tw`w-full h-full`}>
      <Text style={tw`text-[3rem] text-black`}>Doing something...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 50,
    height: 50,
  },
});

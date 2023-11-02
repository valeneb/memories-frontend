import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import tw from 'twrnc';

export default function Loader() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);

  return (
    <View
      style={tw`w-full h-full flex justify-center items-center`}
      // visible={visible}
      // overlayColor="rgba(255,255,255,0.75)"
      // animationStyle={styles.lottie}
      // speed={3}
    >
      <Text style={tw`font-bold text-[3rem]`}>Doing something...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 50,
    height: 50,
  },
});

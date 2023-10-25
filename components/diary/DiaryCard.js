import React, { useState, useRef } from 'react';
import { Text, View, Image } from 'react-native';
import tw from 'twrnc';

export default function DiaryCard({ title, photos, content }) {
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef();

  const updateTextHeight = () => {
    if (textRef.current) {
      textRef.current.measure((fx, fy, width, height, px, py) => {
        setTextHeight(height);
      });
    }
  };

  return (
    <View style={tw`bg-[#F2DDC2] w-full p-[.5rem]`}>
      <Text style={tw`text-[1rem]`}>{title}</Text>
      <View style={tw`flex flex-row w-full items-start pt-[.5rem]`}>
        <View style={tw`w-[40%]`}>
          <Image source={require('../../assets/favicon.png')} alt="photo" style={[tw`w-full rounded-[.5rem]`, { height: textHeight }]} />
        </View>
        <Text
          ref={textRef}
          onLayout={updateTextHeight}
          style={tw`w-[60%] ml-[.5rem]`}
        >
          {content}
        </Text>
      </View>
      <View style={tw`flex flex-row items-center w-full pt-[.5rem]`}>
        {photos.map((photo, index) => {
          return (
            <Image source={require('../../assets/favicon.png')} alt="photo" key={index} style={tw`rounded-[.5rem] w-[50%] mr-[.5rem]`} />
          );
        })}
      </View>
    </View>
  );
}


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`flex items-center justify-center w-full h-full bg-[#D8725B] p-[1rem]`}>
      <Text style={tw`text-[#F2DDC2] text-[1rem]`}>Memories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});

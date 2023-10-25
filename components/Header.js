import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header({
  title,
  icon,
  onClick,
  isDairyActive,
  setIsDairyActive,
}) {
  return (
    <View style={tw`w-full`}>
      <View
        style={tw`flex flex-row items-center justify-between bg-[#D8725B] px-[1rem] pt-[2rem] pb-[1rem]`}
      >
        <Text style={tw`text-[#F2DDC2] text-[2rem]`}>{title}</Text>
        {icon && onClick && (
          <TouchableOpacity onPress={onClick}>
            <FontAwesome name={icon} size={32} color="#F2DDC2" />
          </TouchableOpacity>
        )}
      </View>
      <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity
          style={tw`w-[50%] p-[.5rem] flex items-center ${
            isDairyActive
              ? 'bg-[#D3C3AE] border-b border-r border-black'
              : 'bg-[#F2DDC2]'
          }`}
          onPress={() => setIsDairyActive(!isDairyActive)}
        >
          <Text>Programme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-[50%] p-[.5rem] flex items-center ${
            isDairyActive
              ? 'bg-[#F2DDC2]'
              : 'bg-[#D3C3AE] border-b border-l border-black'
          }`}
          onPress={() => setIsDairyActive(!isDairyActive)}
        >
          <Text>Carnet de voyage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

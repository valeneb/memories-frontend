import { View, ScrollView } from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import DiaryCard from './DiaryCard';

export default function Diary() {
  const diary = [
        {
            title: 'Jour 1 - Découverte de Rio', 
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            photos: ['../../assets/favicon.png', '../../assets/favicon.png']
        },
        {
            title: 'Jour 2 - Découverte de Rio', 
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            photos: ['../../assets/favicon.png', '../../assets/favicon.png']
        }
    ];
  const handleNewDiary = () => {
    console.log('new diary');
  };

  return (
    <ScrollView style={tw`bg-[#F2DDC2] w-full h-full`}>
        {diary.length > 0 ? (
            <View style={tw`w-full h-full p-[.5rem]`}>
                {diary.map((diary, index) => {
                    return (
                        <View key={index} style={tw`w-full`}>
                            <DiaryCard title={diary.title} content={diary.content} photos={diary.photos} />
                        </View>
                    )
                })}
            </View>
        ) : (
            <View style={tw`w-full h-full flex items-center justify-center`}>
                <ButtonLarge title="Commencer mon carnet de voyage" onClick={handleNewDiary}/>
            </View>
        )}
    </ScrollView>
  );
}
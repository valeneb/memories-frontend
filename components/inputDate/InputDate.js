import { SafeAreaView, Button, Text } from 'react-native';
import tw from 'twrnc';
import { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

export default function InputDate() {
    const [date, setDate] = useState();
    const [showModalDatePicker, setShowModalDatePicker] = useState(false);
  
    const showDatepicker = () => {
      setShowModalDatePicker(true);
    };
  
    return (
      <SafeAreaView>
        {showModalDatePicker && (
            <CalendarPicker
                onDateChange={(value) => console.log(value)}
            />
        )}
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Text>selected:</Text>
      </SafeAreaView>
    );
}
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import InputDate from './InputDate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { reverseDate } from '../utils/functions';
import { useDispatch } from 'react-redux';
import { updateTravel } from '../reducers/travel';

const ROUTE_BACK = 'http://192.168.1.13:3000';

export default function Header({ isDairyActive, setIsDairyActive, id }) {
  const dispatch = useDispatch();
  const travels = useSelector((state) => state.travel.value);

  const [edit, setEdit] = useState(false);
  const [travel, setTravel] = useState();

  const [title, setTitle] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const updateInfos = (infos) => {
    fetch(`${ROUTE_BACK}/travel/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(infos),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateTravel(data.trip));
        }
      });
  };

  const handleChange = () => {
    let infos = {};

    if (title !== travel.destination) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${title}&limit=1`
      )
        .then((response) => response.json())
        .then((data) => {
          infos = {
            latitude: data[0].lat,
            longitude: data[0].lon,
            destination: title,
            _id: id,
          };
          updateInfos(infos);
        });
    }

    if (departureDate !== reverseDate(travel.departure)) {
      infos = { departure: departureDate, _id: id };
      updateInfos(infos);
    }

    if (returnDate !== reverseDate(travel.return)) {
      infos = { return: returnDate, _id: id };
      updateInfos(infos);
    }

    setEdit(false);
  };

  useEffect(() => {
    let result = [];
    if (id) {
      result = travels.filter((travel) => travel._id === id);
      setTitle(result[0].destination);
      setDepartureDate(reverseDate(result[0].departure));
      setReturnDate(reverseDate(result[0].return));
      setTravel(result[0]);
    }
  }, [id]);

  return (
    <View style={tw`w-full`}>
      <TouchableHighlight onLongPress={() => setEdit(true)}>
        <View
          style={tw`bg-[#D8725B] pt-[2rem] px-[1rem] pb-[1rem] flex ${
            edit ? 'flex-col' : 'flex-row items-center justify-between'
          }`}
        >
          <TextInput
            value={title}
            onChangeText={(value) => setTitle(value)}
            editable={edit}
            style={tw`${
              edit
                ? 'my-[1rem] p-[.5rem] rounded-[.5rem] bg-[#D9D9D9] text-black w-[60%] text-[1.5rem]'
                : 'text-[#F2DDC2] text-[2rem]'
            }`}
          />
          <View
            style={tw`flex ${
              edit ? 'flex-col' : 'flex-row ml-[.5rem]'
            } items-center `}
          >
            <View
              style={tw`flex flex-row items-center ${edit ? 'w-full' : ''}`}
            >
              <Text
                style={tw`text-[#F2DDC2] font-bold pr-[.5rem] text-[.875rem]`}
              >
                DU
              </Text>
              {edit ? (
                <InputDate
                  value={departureDate}
                  setValue={setDepartureDate}
                  size="normal"
                />
              ) : (
                <Text style={tw`text-black text-[1rem]`}>{departureDate}</Text>
              )}
            </View>
            <View
              style={tw`flex flex-row items-center ${edit ? 'w-full' : ''}`}
            >
              <Text
                style={tw`text-[#F2DDC2] font-bold ${
                  edit ? 'pr-[.5rem]' : 'px-[.5rem]'
                } text-[.875rem]`}
              >
                AU
              </Text>
              {edit ? (
                <InputDate
                  value={returnDate}
                  setValue={setReturnDate}
                  size="normal"
                />
              ) : (
                <Text style={tw`text-black text-[1rem]`}>{returnDate}</Text>
              )}
            </View>
          </View>
          {edit && (
            <View style={tw`w-full flex items-end`}>
              <TouchableOpacity
                onPress={handleChange}
                style={tw`py-[.3rem] px-[.5rem] bg-[#073040] rounded-[.5rem] mt-[.5rem]`}
              >
                <FontAwesome name="check" size={24} color="#F2DDC2" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableHighlight>
      <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity
          style={tw`w-[50%] p-[.5rem] flex items-center ${
            isDairyActive
              ? 'bg-[#D3C3AE] border-b border-r border-black rounded-br-[.5rem]'
              : 'bg-[#F2DDC2]'
          }`}
          onPress={() => setIsDairyActive(false)}
        >
          <Text>Programme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-[50%] p-[.5rem] flex items-center ${
            isDairyActive
              ? 'bg-[#F2DDC2]'
              : 'bg-[#D3C3AE] border-b border-l border-black rounded-bl-[.5rem]'
          }`}
          onPress={() => setIsDairyActive(true)}
        >
          <Text>Carnet de voyage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

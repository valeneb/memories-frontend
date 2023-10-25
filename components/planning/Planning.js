import {
  View,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from 'react-native';
import tw from 'twrnc';
import ButtonLarge from '../ButtonLarge';
import Button from '../Button';
import Header from '../Header';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Planning({ isDairyActive, setIsDairyActive }) {
  const [edit, setEdit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    setEdit(!edit);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const options = [
    "Billet d'avion",
    'Location de voiture',
    'Logement',
    'Autre',
  ];

  return (
    <View style={tw`bg-[#F2DDC2] w-full h-full`}>
      <Header
        title="Brazil"
        isDairyActive={isDairyActive}
        setIsDairyActive={setIsDairyActive}
      />
      <View
        style={tw`w-full h-full flex items-center justify-center items-center justify-center rounded-[.625rem] `}
      >
        {isModalVisible ? (
          <View style={tw`w-4/5 h-auto bg-[#f7ebda] rounded-[.625rem] p-3`}>
            {/*modalContainer : gérer ici affichage de l'icon à gauche*/}
            <FontAwesome
              name="window-close"
              color="#073040"
              size={30}
              onPress={toggleModal}
              style={styles.icon}
            />
            <View style={tw`justify-center items-center`}>
              {/** infosContainer */}
              <Text
                style={[tw`font-bold text-[1rem] p-3`, { color: '#073040' }]}
              >
                Ajouter des informations
              </Text>
              {/* list */}
              <Button
                title="Ajouter"
                style={[tw`p-3`]} /*onPress={addInfos}*/
              />
            </View>
          </View>
        ) : (
          <ButtonLarge title="Commencer mon programme" onClick={toggleModal} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

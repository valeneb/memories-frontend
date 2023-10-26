// import React, { Component } from 'react';
// import { Text } from 'react-native';
// import {
//   Menu,
//   MenuProvider,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import tw from 'twrnc';

// export default function ButtonUD() {
//   return (
//     <MenuProvider style={{ flexDirection: 'column', padding: 30 }}>
//       <Menu onSelect={(value) => alert(`You Clicked : ${value}`)}>
//         <MenuTrigger>
//           <FontAwesome name="navicon" color="#073040" size={24} />
//         </MenuTrigger>

//         <MenuOptions>
//           <MenuOption value={'Login'}>
//             <Text>Update</Text>
//           </MenuOption>
//           <MenuOption value={'Register'}>
//             <Text>Delete</Text>
//           </MenuOption>
//         </MenuOptions>
//       </Menu>
//     </MenuProvider>
//   );
// }

//CODE AVEC REACT NATIVE PAPER

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import tw from 'twrnc';

export default function ButtonUD() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <FontAwesome
              name="navicon"
              color="#073040"
              size={24}
              onPress={openMenu}
            />
          }
          placement="bottom"
        >
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
        </Menu>
      </View>
    </Provider>
  );
}

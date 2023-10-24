import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ButtonLarge({ title, icon, onClick }) {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <TouchableOpacity style={styles.buttonLarge} onPress={() => handleClick()}>
      {icon && <FontAwesome name={icon} style={styles.buttonIcon} />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonLarge: {
    flexDirection: 'row',
    backgroundColor: '#073040',
    width: width * 0.8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#F2DCC2',
    fontSize: Math.min(width, height) * 0.04,
    padding: 16,
  },
  buttonIcon: {
    color: '#F2DCC2',
    fontSize: Math.min(width, height) * 0.1,
  },
});

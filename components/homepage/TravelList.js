import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import TravelCard from '../TravelCard';

export default function TravelList() {
  const travelData = [
    {
      title: 'Voyage 1',
      image: require('../../assets/favicon.png'),
      departure: '01 Janvier 2023',
      arrival: '10 Janvier 2023',
    },
    {
      title: 'Voyage 2',
      image: require('../../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
    {
      title: 'Voyage 3',
      image: require('../../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
    {
      title: 'Voyage 4',
      image: require('../../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
    {
      title: 'Voyage 5',
      image: require('../../assets/favicon.png'),
      departure: '15 Février 2023',
      arrival: '25 Février 2023',
    },
  ];

  return (
    <ScrollView style={styles.travelList}>
      {travelData.map((data, i) => (
        <TravelCard
          key={i}
          title={data.title}
          image={data.image}
          departure={data.departure}
          arrival={data.arrival}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  travelList: {
    height: '100%',
  },
});

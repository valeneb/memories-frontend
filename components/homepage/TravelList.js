import React from 'react';
import { ScrollView } from 'react-native';
import TravelCard from '../TravelCard';
import tw from 'twrnc';

export default function TravelList() {
  const travelData = [
    {
      title: 'Voyage 1',
      image: require('../../assets/favicon.png'),
      departureDate: '01 Janvier 2023',
      returnDate: '10 Janvier 2023',
    },
    {
      title: 'Voyage 2',
      image: require('../../assets/favicon.png'),
      departureDate: '15 Février 2023',
      returnDate: '25 Février 2023',
    },
    {
      title: 'Voyage 3',
      image: require('../../assets/favicon.png'),
      departureDate: '15 Février 2023',
      returnDate: '25 Février 2023',
    },
    {
      title: 'Voyage 4',
      image: require('../../assets/favicon.png'),
      departureDate: '15 Février 2023',
      returnDate: '25 Février 2023',
    },
    {
      title: 'Voyage 5',
      image: require('../../assets/favicon.png'),
      departureDate: '15 Février 2023',
      returnDate: '25 Février 2023',
    },
  ];

  return (
    <ScrollView>
      {travelData.map((data, i) => (
        <TravelCard
          key={i}
          title={data.title}
          image={data.image}
          departureDate={data.departureDate}
          returnDate={data.returnDate}
        />
      ))}
    </ScrollView>
  );
}


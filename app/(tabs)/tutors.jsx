import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View } from 'react-native';
import { EmptyState, SearchInput } from '../../components';
import { TutorCard } from '../../components/tutor-card';

const StudySpots = () => {
  const spots = [
    {
      id: 1,
      name: 'Abdul-Wahab',
      location: 'CS Department',
      spotsLeft: 'Calculus',
      image: 'https://www.ashesi.edu.gh/images/campus/computer_centre_inside.jpg',
    },
    {
      id: 2,
      name: 'Richard Gbamara',
      location: 'CS Department',
      spotsLeft: 'Pre-Calculus',
      image: 'https://www.ashesi.edu.gh/images/campus/warrenlibrary_inside.jpg',
    },
    {
      id: 3,
      name: 'Gordon Duku',
      location: 'BA Department',
      spotsLeft: 'Finance',
      image: 'https://www.ashesi.edu.gh/images/2018_Website/Admissions/advantage/Campus/Ashesi_Apt_Hall_Hangout.jpg',
    },
    {
      id: 4,
      name: 'Henry Owusu',
      location: 'MIS Deapartment',
      spotsLeft: 'Data Analysis',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*_YLAtSSJSpXoOwHoZHer_A.jpeg',
    },
    {
      id: 5,
      name: 'Hafiz Adjei',
      location: 'Engineering ',
      spotsLeft: 'Power Systems',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*_YLAtSSJSpXoOwHoZHer_A.jpeg',
    },
  ];

  return (
    <SafeAreaView className="bg-white h-screen">
      <FlatList
        data={spots}
        keyExtractor={(spot) => spot.id.toString()}
        renderItem={({ item: spot }) => (
          <TutorCard
            key={spot.id}
            name={spot.name}
            location={spot.location}
            capacity={spot.capacity}
            spotsLeft={spot.spotsLeft}
            image={spot.image}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex space-y-2 mb-6">
            <View className="w-full px-4">
              <SearchInput placeholder="Search peer tutors..." />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No spots found" />}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />
    </SafeAreaView>
  );
};

export default StudySpots;

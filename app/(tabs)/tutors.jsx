import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View } from 'react-native';
import { EmptyState, SearchInput } from '../../components';
import { TutorCard } from '../../components/tutor-card';

const StudySpots = () => {
  const spots = [
    {
      id: 1,
      name: 'Mabel Asare',
      location: 'CS Department',
      spotsLeft: 'Calculus',
      image: 'https://www.ashesi.edu.gh/images/2018_Website/Student_Life/asc_2023_24/Kezia_Asante.jpg',
    },
    {
      id: 2,
      name: 'Wofa Yamoah',
      location: 'CS Department',
      spotsLeft: 'Pre-Calculus',
      image: 'https://www.ashesi.edu.gh/images/2018_Website/Student_Life/asc_2023_24/Wofa-Yamoah-Frimpong-Attafuah.jpg',
    },
    {
      id: 3,
      name: 'Jack Odoi',
      location: 'BA Department',
      spotsLeft: 'Finance',
      image: 'https://www.ashesi.edu.gh/images/student_affairs/TK_Azaglo_OSCA.jpg',
    },
    {
      id: 4,
      name: 'Joshua Owusu',
      location: 'MIS Deapartment',
      spotsLeft: 'Data Analysis',
      image: 'https://miro.medium.com/v2/resize:fit:960/1*KQ0q5ETOz5jznyE3TrmdXQ.jpeg',
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

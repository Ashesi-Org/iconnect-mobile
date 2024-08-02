import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { FlatList, ImageBackground, TouchableOpacity, Text, View } from 'react-native';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  return (
    <Animatable.View className="" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={300}>
      <TouchableOpacity className="relative flex justify-center items-center" activeOpacity={0.7}>
        <ImageBackground
          source={{
            uri: item.thumbnail,
          }}
          className="w-[300px] h-[220px] rounded-2xl my-5 overflow-hidden shadow-md"
          resizeMode="cover"
        >
          <View className="absolute bottom-0 w-full h-24 p-4 bg-secondary bg-opacity-30 rounded-b-2xl">
            <Text numberOfLines={1} className="text-white text-lg font-pbold mb-2">
              {item.title}
            </Text>
            <Text className="text-white text-md font-pregular">{item.date}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = () => {
  const posts = [
    {
      id: '1',
      thumbnail: 'https://www.ashesi.edu.gh/images/news_events/news/2022/December/2022ashesi/ashesi-029.jpg',
      title: 'Corporate MeetUp',
      description:
        'Join us for our annual Corporate MeetUp where industry leaders and professionals gather to discuss the latest trends and innovations in the business world. This event provides a unique opportunity to network with like-minded individuals and gain valuable insights into the future of the corporate landscape.',
      date: '10th January, 2023',
      location: 'Ashesi University, Accra, Ghana',
    },
    {
      id: '2',
      thumbnail: 'https://www.ashesi.edu.gh/images/news_events/news/2023/January/C2026/Ashesi_C26_c.jpg',
      title: 'Culture Week',
      description:
        'Experience the rich cultural diversity of our campus community during Culture Week. Enjoy performances, exhibitions, and interactive activities that showcase the vibrant traditions of different cultures. Immerse yourself in a week-long celebration of art, music, dance, and food from around the world.',
      date: '15th February, 2023',
      location: 'Ashesi University, Accra, Ghana',
    },
    {
      id: '3',
      thumbnail: 'https://miro.medium.com/v2/resize:fit:3840/1*gKv2rLIE3Z-ZYiuCXeBFng.jpeg',
      title: 'Crazy Day',
      description:
        'Get ready for a day filled with fun and excitement during Crazy Day. Participate in wacky games, enjoy delicious food, and embrace the spirit of spontaneity and adventure. This event is perfect for those looking to let loose and have a memorable time with friends and fellow students.',
      date: '24th August, 2024',
      location: 'Ashesi University, Accra, Ghana',
    },
  ];

  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
    />
  );
};

export default Trending;

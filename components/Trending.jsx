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
    <Animatable.View className="mr-3" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={300}>
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
      date: '10th January, 2023',
    },
    {
      id: '2',
      thumbnail: 'https://www.ashesi.edu.gh/images/news_events/news/2023/January/C2026/Ashesi_C26_c.jpg',
      title: 'Culture Week',
      date: '15th February, 2023',
    },
    {
      id: '3',
      thumbnail: 'https://miro.medium.com/v2/resize:fit:3840/1*gKv2rLIE3Z-ZYiuCXeBFng.jpeg',
      title: 'Crazy Day',
      date: '24th August, 2024',
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

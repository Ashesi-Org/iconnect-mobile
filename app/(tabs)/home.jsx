import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, RefreshControl, TouchableOpacity, Text, View } from 'react-native';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { EmptyState, SearchInput, Trending } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import PostCard from '../../components/post-card';

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-screen">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard
            id={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            prompt={item.prompt}
            date={item.$createdAt}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex space-y-4">
            <View className="w-full bg-secondary mb-4">
              <View className="flex py-3 justify-between items-center flex-row px-4">
                <View className="flex flex-row items-center gap-2">
                  <Text className="text-2xl font-psemibold text-white">Iconnect</Text>
                </View>

                <View className="mt-1.5 border-2 border-white rounded-full">
                  <TouchableOpacity onPress={() => router.push('/profile')} className="flex w-full items-end">
                    <Image
                      source={{ uri: user?.avatar }}
                      resizeMode="contain"
                      className="w-10 h-10 rounded-full border-2 border-white text-white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="w-full px-4">
              <SearchInput placeholder={'Search posts, students, etc'} />
            </View>

            <View className="w-full flex-1 pt-5 pb-6 px-4">
              <Text className="text-lg font-psemibold text-secondary">Upcoming events 🔥</Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Posts Found" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={<View style={{ height: 70 }} />}
      />
    </SafeAreaView>
  );
};

export default Home;

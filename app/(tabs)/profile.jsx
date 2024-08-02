import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList, TouchableOpacity, Text } from 'react-native';

import { icons } from '../../constants';
import useAppwrite from '../../lib/useAppwrite';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { EmptyState, InfoBox, VideoCard } from '../../components';
import PostCard from '../../components/post-card';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState title="You have no posts yet" subtitle="No videos found for this profile" />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-1 mb-12 px-4">
            <View className="flex flex-row justify-between w-full">
              <Text />
              <TouchableOpacity onPress={logout} className="w-8 h-8 right-4">
                <Image source={icons.logout} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
            <View className="w-24 h-24 border border-secondary flex justify-center items-center rounded-full">
              <Image source={{ uri: user?.avatar }} className="w-[95%] h-[95%] rounded-full" resizeMode="cover" />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg text-black-100 font-psemibold"
            />

            <View className="mt-3 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl text-black-100"
                containerStyles="mr-10"
              />
              <InfoBox title="0" subtitle="Followers" titleStyles="text-xl text-black-100" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

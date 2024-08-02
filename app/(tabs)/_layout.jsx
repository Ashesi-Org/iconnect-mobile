import { StatusBar } from 'expo-status-bar';
import { Redirect, Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { icons, images } from '../../constants';
import { Loader } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4269EC',
          tabBarInactiveTintColor: '#999999',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#EEEEF2',
            height: 84,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#EEEEF2',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create new post',
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
            ),
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'Poppins-SemiBold',
              color: '#4269EC',
              padding: 10,
            },
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Find Places',
            headerShown: true,
            href: null,

            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={images.location} color={color} name="Places" focused={focused} />
            ),
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'Poppins-SemiBold',
              color: '#4269EC',
              padding: 10,
            },
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: true,
            href: null,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
            ),
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'Poppins-SemiBold',
              color: '#4269EC',
              padding: 10,
            },
          }}
        />
        <Tabs.Screen
          name="tutors"
          options={{
            title: 'Peer tutors',
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={images.openbook} color={color} name="Peer tutors" focused={focused} />
            ),
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'Poppins-SemiBold',
              color: '#4269EC',
              padding: 10,
            },
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;

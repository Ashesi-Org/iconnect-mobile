import { useState } from 'react';
import { router, usePathname } from 'expo-router';
import { View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

import { icons } from '../constants';

const SearchInput = ({ initialQuery, placeholder }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-primary rounded-2xl border-2 border-secondary focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-black-100 flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#4269EC"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === '')
            return Alert.alert('Missing Query', 'Please input something to search results across database');

          if (pathname.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5 " resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

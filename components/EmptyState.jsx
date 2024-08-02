import { View, Text, Image } from 'react-native';
import { images } from '../constants';

const EmptyState = ({ title }) => {
  return (
    <View className="flex justify-center items-center px-4 bg-white   ">
      <Image source={images.nopost} resizeMode="contain" className="w-[270px] h-[216px]" />
      <Text className="text-sm font-pmedium text-black-100">{title}</Text>
    </View>
  );
};

export default EmptyState;

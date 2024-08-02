import { useRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ActionSheet from './action-sheet';
import Entypo from '@expo/vector-icons/Entypo';
import CustomButton from './CustomButton';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as MailComposer from 'expo-mail-composer';
import Toast from 'react-native-toast-message';

export const TutorCard = ({ name, image, location, spotsLeft }) => {
  const bottomSheetModalRef = useRef(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [note, setNote] = useState('');

  const handlePressModal = () => {
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {
    async function checkAvailability() {
      const status = await MailComposer.isAvailableAsync();
      setIsAvailable(status);
    }

    checkAvailability();
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const handleBook = async () => {
    // Handle the booking logic here
    // await MailComposer.composeAsync({
    //   subject: `Booking a slot for a ${spotsLeft} session`,
    //   body: "I would like to book a slot for a session with you. I'm looking forward to it.",
    //   recipients: [`${name}@ashesi.edu.gh`],
    // });

    Toast.show({
      type: 'success',
      text1: `Booking for ${name} completed`,
    });
    await handleClosePress();
  };

  const BookOptions = () => {
    return (
      <>
        <View className="mt-6 px-4">
          <View className="mt-2  flex flex-row justify-between">
            <Text className="font-psemibold text-xl text-secondary">Please confirm your booking </Text>
            {/* <TouchableOpacity onPress={handleClosePress}>
              <AntDesign name="closecircle" size={24} color="#4269EC" />
            </TouchableOpacity> */}
          </View>
          <View>
            {/* <BottomSheetTextInput
              value={note}
              onChangeText={(text) => setNote(text)}
              placeholder="Enter a note..."
              style={styles.input}
            /> */}
          </View>
          <CustomButton handlePress={handleBook} title="Book a meeting" containerStyles="mt-6" />
        </View>
      </>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePressModal} className=" px-4 mb-6">
        <View className="flex  w-full px-3 py-4 bg-white rounded-xl border border-gray-300 shadow-xl">
          <View className="flex flex-row w-full gap-4">
            <View>
              <Image source={{ uri: image }} className="w-32 h-32 rounded-xl" resizeMode="cover" />
            </View>
            <View className="pt-3">
              <View className="flex flex-row items-center mb-2">
                <Entypo name="location-pin" size={26} color="gray" />
                <Text className="text-md text-gray-500 font-pmedium">{location}</Text>
              </View>
              <View className="flex flex-row items-center mt-1">
                <Text className="text-xl text-secondary font-pbold ">{name}</Text>
              </View>
              <View className="flex flex-row items-center mt-3">
                <Text className="text-md text-gray-500 ml-1 font-pmedium">{spotsLeft}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <ActionSheet
        snapPoints={['30%', '27%']}
        children={<BookOptions />}
        ref={bottomSheetModalRef}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 17,
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4269EC',
  },
});

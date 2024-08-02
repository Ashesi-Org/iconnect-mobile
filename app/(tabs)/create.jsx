import { useState } from 'react';
import { router } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';

import { icons } from '../../constants';
import { createVideoPost } from '../../lib/appwrite';
import { CustomButton, FormField } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif'],
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if ((form.prompt === '') | !form.thumbnail) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4">
        <FormField
          title="Title"
          value={form.title}
          placeholder="ex: Graduating in 30 days..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles=""
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-black-100 font-pmedium">Upload Image</Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} resizeMode="cover" className="w-full h-64 rounded-2xl" />
            ) : (
              <View
                className="w-full h-32 px-4 bg-primary rounded-2xl border-2 border-secondary flex justify-center items-center flex-col space-x-2"
                style={{ borderRadius: 1 }}
              >
                <Image source={icons.image} resizeMode="contain" alt="upload" className="w-10 h-10" />
                <Text className="text-md text-gray-600 font-psemibold mt-3">Click to choose an image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Description"
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
          placeholder={"What's on your mind?..."}
          inputHeight={'h-36'}
        />
        <CustomButton title="Create post" handlePress={submit} containerStyles="mt-7" isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

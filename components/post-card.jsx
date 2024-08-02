import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Share, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import { timeAgo } from '../lib/utils';
import ActionSheet from './action-sheet';
import Toast from 'react-native-toast-message';
import { editUserVideoPost, deleteUserVideoPost, getAllPosts } from '../lib/appwrite';
import useAppwrite from '../lib/useAppwrite';
import Ionicons from '@expo/vector-icons/Ionicons';
import FormField from './FormField';
import CustomButton from './CustomButton';

const PostCard = ({ creator, avatar, thumbnail, prompt, date, id }) => {
  const bottomSheetModalRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handlePressModal = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <View className="flex flex-col items-center px-4 mb-6">
        <View className="flex flex-col items-center w-full p-4 shadow-lg bg-white rounded-lg border border-gray-300">
          <View className="flex flex-row gap-3 items-start w-full">
            <View className="flex flex-row flex-1 items-center">
              <View className="w-[46px] h-[46px] rounded-full border border-secondary flex justify-center items-center p-0.5">
                <Image source={{ uri: avatar }} className="w-full h-full rounded-full" resizeMode="cover" />
              </View>
              <View className="flex justify-center flex-1 ml-3 gap-y-1">
                <Text className="text-md text-black-100 font-pregular">{creator}</Text>
                <Text className="text-sm text-gray-500">Posted {timeAgo(date)} ago</Text>
              </View>
            </View>

            <View className="flex flex-row items-center pt-2">
              <Text onPress={handlePressModal} className="ml-4">
                <FontAwesome6 name="ellipsis-vertical" size={20} color="gray" />{' '}
              </Text>
            </View>
          </View>

          <Text className="text-md text-black-100 font-pregular mt-3 w-full">{prompt}</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center shadow-md"
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet ref={bottomSheetModalRef}>
        <PostOptions prompt={prompt} id={id} bottomSheetModalRef={bottomSheetModalRef} />
      </ActionSheet>
    </>
  );
};

export default PostCard;

const PostOptions = ({ id, bottomSheetModalRef, prompt }) => {
  const postId = id;
  const { refetch } = useAppwrite(getAllPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [updatePrompt, setUpdatePrompt] = useState(prompt ? prompt : '');

  const handleEdit = async (postId, updatedData) => {
    try {
      await editUserVideoPost(postId, updatedData);
      Toast.show({
        type: 'success',
        text1: `Post updated successfully.`,
      });
      setIsEditing(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Failed to update post`,
      });
      console.log('Updating routine error: ', error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deleteUserVideoPost(postId);
      Toast.show({
        type: 'success',
        text1: `Post deleted successfully.`,
      });
      bottomSheetModalRef.current?.dismiss();
      await refetch();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Failed to delete post`,
      });
      console.log('Deleting post error: ', error.message);
    }
  };

  const handleShare = async () => {
    const url = 'https://iconnect.app';
    try {
      const result = await Share.share({
        message: `Hey! I found this post on Iconnect, check it out \n: ${url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderEditForm = () => (
    <View className="mt-1 px-4">
      <View className="flex flex-row items-center justify-between">
        <Ionicons onPress={() => setIsEditing(false)} name="arrow-back" size={24} color="#4269EC" />
        <Text className="text-md text-gray-700 text-xl font-psemibold">Update your post</Text>
        <View className="" />
      </View>
      <FormField
        value={updatePrompt}
        handleChangeText={setUpdatePrompt}
        placeholder={"What's on your mind?..."}
        inputHeight={'h-24'}
      />
      <CustomButton
        containerStyles="mt-5"
        title="Save Changes"
        handlePress={() => handleEdit(postId, { prompt: updatePrompt })}
      />
    </View>
  );

  const renderOptions = () => (
    <View className="mt-6 px-4">
      <TouchableOpacity onPress={() => setIsEditing(true)} className="flex flex-row items-center p-3 gap-3 mb-3">
        <Foundation name="pencil" size={28} color="#616161" />
        <Text className="text-md text-gray-700 text-xl font-pmedium">Edit post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(postId)} className="flex flex-row items-center p-3 gap-3 mb-3">
        <FontAwesome6 name="trash-can" size={24} color="red" />
        <Text className="text-md text-[#F44336] text-xl font-pmedium">Delete post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare} className="flex flex-row items-center p-3 gap-3 mb-3">
        <Feather name="share" size={24} color="#616161" />
        <Text className="text-md text-gray-700 text-xl font-pmedium">Share with friends</Text>
      </TouchableOpacity>
    </View>
  );

  return isEditing ? renderEditForm() : renderOptions();
};

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
  },
});

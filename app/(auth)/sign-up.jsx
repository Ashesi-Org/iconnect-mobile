import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';

import { images } from '../../constants';
import { createUser } from '../../lib/appwrite';
import { CustomButton, FormField } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace('/sign-in');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <View className="flex flex-row items-center gap-3">
            <Text className="text-3xl text-secondary font-pbold ">Iconnect</Text>
            <Image source={images.graduationHat} resizeMode="contain" className="w-[35px] h-[34px]" />
          </View>
          <Text className="text-lg mt-4 font-semibold text-black-100 font-psemibold">Sign Up to Iconnect</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
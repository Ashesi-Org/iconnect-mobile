import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { icons } from '../constants';

const FormField = ({ title, value, placeholder, inputHeight, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-pmedium">{title}</Text>

      <View
        className={`w-full ${
          inputHeight ? inputHeight : 'h-16'
        } px-4 bg-primary rounded-2xl border-2 border-secondary focus:border-secondary flex flex-row items-center`}
      >
        {inputHeight ? (
          <TextInput
            style={[styles.input]}
            className="flex-1 text-black-100 font-psemibold text-base "
            value={value}
            multiline
            numberOfLines={5}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            {...props}
          />
        ) : (
          <TextInput
            className="flex-1 text-black-100 font-psemibold text-base "
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            {...props}
          />
        )}

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
  },
});

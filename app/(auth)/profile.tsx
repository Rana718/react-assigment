import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImg from '@/assets/images/user.png';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');

  const handleContinue = async () => {
    if (fullName.trim()) {
      await AsyncStorage.setItem('fullName', fullName);
      router.push('/(auth)/about-step1');
    }
  };

  return (
    <View className="flex-1 bg-[#3DC4AB] px-6 pt-16">
      <View className="items-center mb-8">
        <Image source={UserImg} className="w-32 h-32 rounded-full mb-6" />
        
        <Text className="text-black text-xl font-bold mb-6">
          What should we call you?
        </Text>
      </View>

      <TextInput
        className="bg-white rounded-lg px-4 py-3 mb-6 text-black"
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Pressable 
        className="bg-black rounded-lg py-3 mb-4"
        onPress={handleContinue}
      >
        <Text className="text-white text-center font-semibold">Let's get to know you</Text>
      </Pressable>

      <Text className="text-black text-center text-sm">
        Your safety is our priority
      </Text>
    </View>
  );
}
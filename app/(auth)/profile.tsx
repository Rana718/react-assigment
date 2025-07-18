import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
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
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-[#3DC4AB]" contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 64 }}>
      <View className="items-center mt-16 mb-8">
        <Image source={UserImg} className="w-32 h-32 rounded-full mb-6" />

        <Text className="text-black text-xl font-bold mb-6">
          What should we call you?
        </Text>
      </View>


      <Text className="text-black mb-2 font-bold pt-5">Full Name</Text>

      <TextInput
        className="bg-white rounded-lg px-4 py-3 mb-6 text-black"
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Pressable
        className="bg-black rounded-lg py-4 mb-4 w-2/3 self-center" 
        onPress={handleContinue}
      >
        <Text className="text-white text-center font-semibold">Let's get to know you</Text>
      </Pressable>

      <Text className="text-black text-center text-sm">
        Your safety is our priority
      </Text>
    </ScrollView>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RectangleImg from '@/assets/images/Rectangle.png';

export default function SignInScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = async () => {
    if (phoneNumber.trim()) {
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      router.push('/(auth)/verification');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#3DC4AB]" contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 64 }}>
      <Text className="text-black text-2xl font-bold text-center mb-2">
        Welcome to OkaBoka
      </Text>
      
      <Text className="text-black text-lg text-center mb-8">
        Connect with emotionally similar people
      </Text>

      <View className="items-center mb-8">
        <View className="w-32 h-32 rounded-full bg-white items-center justify-center mb-6">
          <Image source={RectangleImg} className="w-24 h-24" resizeMode="contain" />
        </View>
        
        <Text className="text-black text-base text-center mb-6">
          Let's start with your number your world begins here.
        </Text>
      </View>

      <TextInput
        className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text className="text-black text-center mb-4">or</Text>

      <Pressable className="bg-green-500 rounded-lg py-3 mb-4">
        <Text className="text-white text-center font-semibold">Continue with WhatsApp</Text>
      </Pressable>

      <Pressable 
        className="bg-black rounded-lg py-3 mb-4"
        onPress={handleSendCode}
      >
        <Text className="text-white text-center font-semibold">Send me the code</Text>
      </Pressable>

      <Text className="text-black text-center text-sm">
        We'll never share your number
      </Text>
    </ScrollView>
  );
}
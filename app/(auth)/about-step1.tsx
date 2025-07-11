import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AboutStep1Screen() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const handleContinue = async () => {
    if (dateOfBirth && gender && location) {
      await AsyncStorage.setItem('dateOfBirth', dateOfBirth);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('location', location);
      router.push('/(auth)/about-step2');
    }
  };

  return (
    <View className="flex-1 bg-[#3DC4AB] px-6 pt-16">
      <Pressable 
        className="mb-6"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <Text className="text-black text-lg font-bold mb-6 text-center">
        A little about you so we match better
      </Text>

      <TextInput
        className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

      <View className="mb-4">
        <Text className="text-black mb-2">Gender</Text>
        <View className="flex-row">
          {['Male', 'Female', 'Other'].map((option) => (
            <Pressable
              key={option}
              className={`mr-3 px-4 py-2 rounded-lg ${gender === option ? 'bg-black' : 'bg-white'}`}
              onPress={() => setGender(option)}
            >
              <Text className={gender === option ? 'text-white' : 'text-black'}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <TextInput
        className="bg-white rounded-lg px-4 py-3 mb-6 text-black"
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <Pressable 
        className="bg-black rounded-lg py-3 mb-4"
        onPress={handleContinue}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </Pressable>

      <Text className="text-black text-center text-sm mb-2">
        Who are you open to connecting with?
      </Text>
    </View>
  );
}
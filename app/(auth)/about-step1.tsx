import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AboutStep1Screen() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [location, setLocation] = useState('');

  const handleContinue = async () => {
    const dateOfBirth = `${day}/${month}/${year}`;

    if (day && month && year && gender && location) {
      await AsyncStorage.setItem('dateOfBirth', dateOfBirth);
      await AsyncStorage.setItem('gender', gender === 'Other' ? customGender : gender);
      await AsyncStorage.setItem('location', location);
      router.push('/(auth)/about-step2');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#3DC4AB] pt-10 px-4" >
      <Pressable className="mb-6" onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <Text className="text-black text-2xl font-bold mb-10 text-center">
        A little about you so we match better
      </Text>

      <Text className="text-black mb-2">Date of Birth</Text>
      <View className="flex-row justify-between mb-4">
        <TextInput
          className="bg-white rounded-lg px-4 py-3 text-black w-[30%]"
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={setDay}
        />
        <TextInput
          className="bg-white rounded-lg px-4 py-3 text-black w-[30%]"
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={month}
          onChangeText={setMonth}
        />
        <TextInput
          className="bg-white rounded-lg px-4 py-3 text-black w-[35%]"
          placeholder="YYYY"
          keyboardType="numeric"
          maxLength={4}
          value={year}
          onChangeText={setYear}
        />
      </View>

      <View className="mb-4">
        <Text className="text-black mb-2">Gender</Text>
        <View className="flex-row flex-wrap gap-2">
          {['Male', 'Female', 'Other'].map((option) => (
            <Pressable
              key={option}
              className={`px-4 py-2 rounded-lg ${gender === option ? 'bg-black' : 'bg-white'}`}
              onPress={() => setGender(option)}
            >
              <Text className={gender === option ? 'text-white' : 'text-black'}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {gender === 'Other' && (
        <TextInput
          className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
          placeholder="Enter your gender"
          value={customGender}
          onChangeText={setCustomGender}
        />
      )}

      <TextInput
        className="bg-white rounded-lg px-4 py-3 mb-6 text-black"
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <Pressable className="bg-black rounded-lg py-3 mb-4" onPress={handleContinue}>
        <Text className="text-white text-center font-semibold">Continue</Text>
      </Pressable>

      <Text className="text-black text-center text-sm mb-2">
        Who are you open to connecting with?
      </Text>
    </ScrollView>
  );
}

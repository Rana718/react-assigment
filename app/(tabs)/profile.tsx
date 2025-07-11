import React from 'react';
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/(auth)/signin');
  };

  return (
    <View className="flex-1 bg-[#3DC4AB] px-6 pt-16">
      <Text className="text-black text-2xl font-bold mb-6 text-center">
        Profile Settings
      </Text>
      
      <Pressable 
        className="bg-red-500 rounded-lg py-3"
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-semibold">Logout</Text>
      </Pressable>
    </View>
  );
}
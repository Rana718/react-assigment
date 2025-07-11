import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const fullName = await AsyncStorage.getItem('fullName');
      const dateOfBirth = await AsyncStorage.getItem('dateOfBirth');
      const gender = await AsyncStorage.getItem('gender');
      const location = await AsyncStorage.getItem('location');
      const aboutStep2 = await AsyncStorage.getItem('aboutStep2');
      
      setUserData({
        phoneNumber,
        fullName,
        dateOfBirth,
        gender,
        location,
        ...JSON.parse(aboutStep2 || '{}')
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#3DC4AB]">
      <View className="px-6 pt-16">
        <Text className="text-black text-2xl font-bold mb-6 text-center">
          Welcome to OkaBoka Dashboard
        </Text>
        
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-black text-lg font-bold mb-2">Your Profile Data:</Text>
          <Text className="text-black mb-1">Name: {userData.fullName || 'Not set'}</Text>
          <Text className="text-black mb-1">Phone: {userData.phoneNumber || 'Not set'}</Text>
          <Text className="text-black mb-1">Date of Birth: {userData.dateOfBirth || 'Not set'}</Text>
          <Text className="text-black mb-1">Gender: {userData.gender || 'Not set'}</Text>
          <Text className="text-black mb-1">Location: {userData.location || 'Not set'}</Text>
          <Text className="text-black mb-1">Interested In: {userData.interestedIn || 'Not set'}</Text>
          <Text className="text-black mb-1">Relationship Status: {userData.relationshipStatus || 'Not set'}</Text>
          <Text className="text-black mb-1">Occupation: {userData.occupation || 'Not set'}</Text>
          {userData.collegeName && <Text className="text-black mb-1">College: {userData.collegeName}</Text>}
          {userData.companyName && <Text className="text-black mb-1">Company: {userData.companyName}</Text>}
          {userData.role && <Text className="text-black mb-1">Role: {userData.role}</Text>}
          {userData.workType && <Text className="text-black mb-1">Work Type: {userData.workType}</Text>}
        </View>
      </View>
    </ScrollView>
  );
}
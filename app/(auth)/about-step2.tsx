import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AboutStep2Screen() {
  const [interestedIn, setInterestedIn] = useState('');
  const [otherInterest, setOtherInterest] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [currentlyStudying, setCurrentlyStudying] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [workType, setWorkType] = useState('');

  const handleContinue = async () => {
    const data = {
      interestedIn: interestedIn === 'Other' ? otherInterest : interestedIn,
      relationshipStatus,
      occupation,
      collegeName,
      currentlyStudying,
      companyName,
      role,
      workType
    };
    await AsyncStorage.setItem('aboutStep2', JSON.stringify(data));
    await AsyncStorage.setItem('isAuthenticated', 'true');
    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('isAuthenticated', 'true');
    router.replace('/(tabs)');
  };

  return (
    <ScrollView className="flex-1 bg-[#3DC4AB]">
      <View className="px-6 pt-16">
        <Pressable 
          className="mb-6"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>

        <Text className="text-black text-lg font-bold mb-6 text-center">
          Let us understand who you're looking for and where you're at.
        </Text>

        <Text className="text-black font-semibold mb-2">
          Interested In (Who's energy do you connect with?)
        </Text>
        <View className="flex-row flex-wrap mb-4">
          {['Male', 'Female', 'Other'].map((option) => (
            <Pressable
              key={option}
              className={`mr-3 mb-2 px-4 py-2 rounded-lg ${interestedIn === option ? 'bg-black' : 'bg-white'}`}
              onPress={() => setInterestedIn(option)}
            >
              <Text className={interestedIn === option ? 'text-white' : 'text-black'}>{option}</Text>
            </Pressable>
          ))}
        </View>

        {interestedIn === 'Other' && (
          <TextInput
            className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
            placeholder="Please specify"
            value={otherInterest}
            onChangeText={setOtherInterest}
          />
        )}

        <Text className="text-black font-semibold mb-2">Relationship Status</Text>
        <View className="flex-row flex-wrap mb-4">
          {['Single', 'In a relationship', 'Married', 'It\'s complicated'].map((option) => (
            <Pressable
              key={option}
              className={`mr-3 mb-2 px-4 py-2 rounded-lg ${relationshipStatus === option ? 'bg-black' : 'bg-white'}`}
              onPress={() => setRelationshipStatus(option)}
            >
              <Text className={relationshipStatus === option ? 'text-white' : 'text-black'}>{option}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-black font-semibold mb-2">Are you</Text>
        <View className="flex-row flex-wrap mb-4">
          {['Student', 'Employee', 'Freelancer', 'Other'].map((option) => (
            <Pressable
              key={option}
              className={`mr-3 mb-2 px-4 py-2 rounded-lg ${occupation === option ? 'bg-black' : 'bg-white'}`}
              onPress={() => setOccupation(option)}
            >
              <Text className={occupation === option ? 'text-white' : 'text-black'}>{option}</Text>
            </Pressable>
          ))}
        </View>

        {occupation === 'Student' && (
          <>
            <TextInput
              className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
              placeholder="College/School Name"
              value={collegeName}
              onChangeText={setCollegeName}
            />
            <TextInput
              className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
              placeholder="Currently studying in"
              value={currentlyStudying}
              onChangeText={setCurrentlyStudying}
            />
          </>
        )}

        {occupation === 'Employee' && (
          <>
            <TextInput
              className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
              placeholder="Company Name"
              value={companyName}
              onChangeText={setCompanyName}
            />
            <TextInput
              className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
              placeholder="Role"
              value={role}
              onChangeText={setRole}
            />
          </>
        )}

        {(occupation === 'Freelancer' || occupation === 'Other') && (
          <TextInput
            className="bg-white rounded-lg px-4 py-3 mb-4 text-black"
            placeholder="What kind of work do you do?"
            value={workType}
            onChangeText={setWorkType}
          />
        )}

        <Pressable 
          className="bg-black rounded-lg py-3 mb-4"
          onPress={handleContinue}
        >
          <Text className="text-white text-center font-semibold">Continue</Text>
        </Pressable>

        <Text className="text-black text-center text-sm mb-2">
          Your very first vibe
        </Text>
        
        <Pressable onPress={handleSkip}>
          <Text className="text-black text-center text-sm underline mb-6">
            Skip for now
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
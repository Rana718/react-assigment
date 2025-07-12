import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

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
      workType,
    };
    await AsyncStorage.setItem('aboutStep2', JSON.stringify(data));
    await AsyncStorage.setItem('isAuthenticated', 'true');

    Toast.show({
      type: 'success',
      text1: 'Account Created Successfully',
      text2: 'Welcome to OkaBoka! Your profile is now complete',
      position: 'top',
      visibilityTime: 3000,
    });

    setTimeout(() => {
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('isAuthenticated', 'true');

    Toast.show({
      type: 'success',
      text1: 'Account Created Successfully',
      text2: 'Welcome to OkaBoka! You can complete your profile later',
      position: 'top',
      visibilityTime: 3000,
    });

    setTimeout(() => {
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#3DC4AB]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 160, 
        }}
      >
        <View className="px-4 pt-16 pb-10">
          <Pressable className="mb-6" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>

          <Text className="text-black text-2xl font-bold mb-10 text-center">
            Let us understand who you're looking for and where you're at.
          </Text>

          <Text className="text-black font-semibold text-base mb-2">
            Interested In{' '}
            <Text className="text-gray-900 font-light">
              (Whose energy do you connect with?)
            </Text>
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {['Male', 'Female', 'Other'].map((option) => (
              <Pressable
                key={option}
                className={`px-4 py-4 rounded-xl border ${
                  interestedIn === option
                    ? 'bg-black border-black'
                    : 'bg-white border-gray-300'
                }`}
                onPress={() => setInterestedIn(option)}
              >
                <Text className={interestedIn === option ? 'text-white' : 'text-black'}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          {interestedIn === 'Other' && (
            <TextInput
              className="bg-white rounded-xl px-4 py-4 mb-4 text-black shadow-sm border border-gray-300"
              placeholder="Please specify"
              value={otherInterest}
              onChangeText={setOtherInterest}
            />
          )}

          <Text className="text-black font-semibold text-base mb-2">
            Relationship Status
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {['Single', 'In a relationship', 'Married', "It's complicated"].map((option) => (
              <Pressable
                key={option}
                className={`px-4 py-4 rounded-xl border ${
                  relationshipStatus === option
                    ? 'bg-black border-black'
                    : 'bg-white border-gray-300'
                }`}
                onPress={() => setRelationshipStatus(option)}
              >
                <Text className={relationshipStatus === option ? 'text-white' : 'text-black'}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text className="text-black font-semibold text-base mb-2">Are you</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {['Student', 'Employee', 'Freelancer', 'Other'].map((option) => (
              <Pressable
                key={option}
                className={`px-4 py-4 rounded-xl border ${
                  occupation === option
                    ? 'bg-black border-black'
                    : 'bg-white border-gray-300'
                }`}
                onPress={() => setOccupation(option)}
              >
                <Text className={occupation === option ? 'text-white' : 'text-black'}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          {occupation === 'Student' && (
            <>
              <TextInput
                className="bg-white rounded-xl px-4 py-4 mb-4 text-black shadow-sm border border-gray-300"
                placeholder="College/School Name"
                value={collegeName}
                onChangeText={setCollegeName}
              />
              <TextInput
                className="bg-white rounded-xl px-4 py-4 mb-4 text-black shadow-sm border border-gray-300"
                placeholder="Currently studying in"
                value={currentlyStudying}
                onChangeText={setCurrentlyStudying}
              />
            </>
          )}

          {occupation === 'Employee' && (
            <>
              <TextInput
                className="bg-white rounded-xl px-4 py-4 mb-4 text-black shadow-sm border border-gray-300"
                placeholder="Company Name"
                value={companyName}
                onChangeText={setCompanyName}
              />
              <TextInput
                className="bg-white rounded-xl px-4 py-4 mb-4 text-black shadow-sm border border-gray-300"
                placeholder="Role"
                value={role}
                onChangeText={setRole}
              />
            </>
          )}

          {(occupation === 'Freelancer' || occupation === 'Other') && (
            <TextInput
              className="bg-white rounded-xl px-4 py-4 mb-4 text-black shadow-sm border border-gray-300"
              placeholder="What kind of work do you do?"
              value={workType}
              onChangeText={setWorkType}
            />
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-10 left-0 right-0 px-4 pb-6">
        <Pressable
          className="bg-black rounded-xl py-4 mb-3 w-2/3 self-center shadow-md"
          onPress={handleContinue}
        >
          <Text className="text-white text-center font-semibold text-base">Continue</Text>
        </Pressable>

        <Text className="text-black text-center text-sm mb-1">
          Your very first vibe
        </Text>
        <Pressable onPress={handleSkip}>
          <Text className="text-black text-center text-base font-bold underline">
            Skip for now
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

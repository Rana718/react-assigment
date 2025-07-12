import RectangleImg from '@/assets/images/Rectangle.png';
import UserImg from '@/assets/images/user.png';
import RenderImages from '@/components/Imagecard';
import { moods, posts } from '@/constants/PostData';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out? This will clear all your data.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              
              Toast.show({
                type: 'success',
                text1: 'Logout Successfully',
                text2: 'You have been signed out successfully',
                position: 'top',
                visibilityTime: 3000,
              });
              
              setTimeout(() => {
                router.replace('/(auth)/signin');
              }, 1000);
            } catch (error) {
              console.error('Error clearing storage:', error);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to sign out. Please try again.',
                position: 'top',
                visibilityTime: 3000,
              });
            }
          }
        }
      ]
    );
    setShowProfileDropdown(false);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-[#3DC4AB] px-4 pt-12 pb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-3">
              <Image source={RectangleImg} className="w-8 h-8" resizeMode="contain" />
            </View>
            <Text className="text-black text-xl font-bold">OkaBoka</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="notifications-outline" size={24} color="black" className="mr-3" />
            <Pressable onPress={() => setShowProfileDropdown(true)}>
              <Image source={UserImg} className="w-8 h-8 rounded-full" />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView 
        keyboardShouldPersistTaps="handled" 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 py-5 mt-[1px] bg-[#3DC4AB]">
          <Text className="text-center text-lg font-semibold mb-4">How I'm Feeling Right Now</Text>
          <View className="flex-row items-center justify-center">
            <Ionicons name="chevron-back" size={20} color="#666" />
            <View className="mx-4 flex-row items-end" style={{ height: 70 }}>
              {moods.map((mood, index) => (
                <TouchableOpacity
                  key={mood.id}
                  style={{
                    marginHorizontal: 12,
                    alignItems: 'center',
                    transform: selectedMood === index ? [{ translateY: -10 }] : [{ translateY: 0 }]
                  }}
                  onPress={() => setSelectedMood(index)}
                >
                  <Text style={{ fontSize: selectedMood === index ? 48 : 36, marginBottom: 2 }}>
                    {mood.emoji}
                  </Text>
                  {selectedMood === index && (
                    <View className="flex-row items-center justify-center">
                      <AntDesign name="user" size={14} color="black" />
                      <Text className='text-[11px] text-[#666] ml-0.5'>{mood.users}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </View>

        <View className="px-4 pt-3">
          {posts.map((post) => (
            <View key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 p-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Text className="text-gray-600 text-sm mr-2">{post.date}</Text>
                  <Text className="text-lg">{post.mood}</Text>
                </View>
                <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
              </View>
              <Text className="text-xs text-gray-400 mb-3">Feeling of the Day</Text>

              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={16} color="#666" className="mr-2" />
                <Text className="text-gray-600 text-sm">{post.location}</Text>
              </View>

              <View className="h-px bg-gray-200 mb-3" />

              <Text className="text-gray-700 text-sm mb-3">{post.description}</Text>

              {RenderImages(post.images, post.id)}
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable
        className="absolute bottom-8 right-6 w-14 h-14 bg-[#3DC4AB] rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/(tabs)/camera')}
      >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>

      <Modal
        visible={showProfileDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileDropdown(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setShowProfileDropdown(false)}
        >
          <View className="absolute top-16 right-4 bg-white rounded-lg shadow-lg min-w-[150px]">
            <Pressable
              className="flex-row items-center px-4 py-3"
              onPress={handleSignOut}
            >
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text className="ml-3 text-red-500 font-medium">Sign Out</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

    </View>
  );
}
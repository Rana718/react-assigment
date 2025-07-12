import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { moods, posts } from '@/constants/PostData';
import UserImg from '@/assets/images/user.png';
import RectangleImg from '@/assets/images/Rectangle.png';
import RenderImages from '@/components/Imagecard';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState(0);

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
            <Image source={UserImg} className="w-8 h-8 rounded-full" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
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

    </View>
  );
}
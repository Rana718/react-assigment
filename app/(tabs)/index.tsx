import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { moods, posts } from '@/constants/PostData';
import UserImg from '@/assets/images/user.png';
import RectangleImg from '@/assets/images/Rectangle.png';
import RenderImages from '@/components/Imagecard';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState(0);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
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
        {/* Mood Section */}
        <View className="px-4 py-6">
          <Text className="text-center text-lg font-semibold mb-4">How I'm Feeling Right Now</Text>
          <View className="flex-row items-center justify-center">
            <Ionicons name="chevron-back" size={20} color="#666" />
            <View className="mx-4 flex-row">
              {moods.map((mood, index) => (
                <TouchableOpacity
                  key={mood.id}
                  style={{ marginHorizontal: 12, alignItems: 'center' }}
                  onPress={() => setSelectedMood(index)}
                >
                  <Text style={{ fontSize: selectedMood === index ? 48 : 36, marginBottom: 8 }}>
                    {mood.emoji}
                  </Text>
                  {selectedMood === index && (
                    <View style={{ alignItems: 'center' }}>
                      <Image source={UserImg} style={{ width: 24, height: 24, borderRadius: 12, marginBottom: 4 }} />
                      <Text style={{ fontSize: 12, color: '#666' }}>{mood.users}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </View>

        {/* Posts Section */}
        <View className="px-4">
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
        className="absolute bottom-20 right-6 w-14 h-14 bg-[#3DC4AB] rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/camera')}
      >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}
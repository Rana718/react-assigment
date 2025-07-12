import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CameraScreen() {
  const [selectedMode, setSelectedMode] = useState<'image' | 'video' | 'text'>('image');
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    'https://picsum.photos/400/400?random=30',
    'https://picsum.photos/400/400?random=31',
    'https://picsum.photos/400/400?random=32',
    'https://picsum.photos/400/400?random=33',
    'https://picsum.photos/400/400?random=34',
    'https://picsum.photos/400/400?random=35',
  ];

  // const openGallery = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
  //   if (!result.canceled) {
  //     setSelectedImage(result.uri);
  //   }
  // };

  return (
    <View className="flex-1 bg-black">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-white text-lg font-semibold">Camera</Text>
        <View className="w-6" />
      </View>

      {/* Camera Area */}
      <View className="flex-1 mx-4 bg-gray-800 rounded-3xl overflow-hidden relative">
        <View className="flex-1 items-center justify-center">
          <Ionicons name="camera" size={80} color="#666" />
          <Text className="text-gray-400 mt-4">Camera Preview</Text>
        </View>

        {/* Controls */}
        <View className="absolute top-4 right-4 space-y-4">
          <Ionicons name="flash" size={24} color="white" className="opacity-80 mb-4" />
          <Ionicons name="images" size={24} color="white" className="opacity-80 mb-4" />
          <Ionicons name="camera-reverse" size={24} color="white" className="opacity-80" />
        </View>
      </View>

      {/* Mode Toggle */}
      <View className="px-4 py-6 bg-black">
        <View className="flex-row justify-center space-x-8 relative">
          {['text', 'image', 'video'].map((mode) => (
            <Pressable key={mode} onPress={() => setSelectedMode(mode as any)} className="items-center">
              <Text className={`text-white text-lg font-semibold ${selectedMode === mode ? 'text-[#3DC4AB]' : ''}`}>
                {mode.toUpperCase()}
              </Text>
              {selectedMode === mode && <View className="h-1 w-full bg-[#3DC4AB] mt-2 rounded-full" />}
            </Pressable>
          ))}
        </View>

        {/* Bottom Buttons */}
        <View className="flex-row justify-between items-center mt-8">
          <Pressable
            className="w-16 h-16 bg-gray-700 rounded-xl items-center justify-center"
            onPress={() => setShowGallery(true)}
          >
            <Ionicons name="images" size={24} color="white" />
          </Pressable>

          <View className="w-20 h-20 bg-[#3DC4AB] rounded-full items-center justify-center">
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
              {selectedMode === 'video' ? (
                <View className="w-6 h-6 bg-red-500 rounded-sm" />
              ) : (
                <Ionicons name="camera" size={24} color="black" />
              )}
            </View>
          </View>

          <Pressable className="w-16 h-16 bg-gray-700 rounded-xl items-center justify-center">
            <Ionicons name="settings" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Gallery Modal */}
      <Modal visible={showGallery} animationType="slide" transparent>
        <View className="flex-1 bg-black bg-opacity-95 pt-16 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Gallery</Text>
            <Pressable onPress={() => setShowGallery(false)}>
              <Ionicons name="close" size={28} color="white" />
            </Pressable>
          </View>
          <FlatList
            data={galleryImages}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => setSelectedImage(item)} className="mb-4">
                <Image source={{ uri: item }} style={{ width: (width - 48) / 2, height: 180, borderRadius: 12 }} />
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
}

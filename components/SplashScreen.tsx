import React from 'react';
import { View, Text, Image } from 'react-native';
import SplashImg from '@/assets/images/Rectangle.png';

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-[#3DC4AB] justify-center items-center">

      <View className="w-40 h-40 rounded-full bg-white items-center justify-center mb-6 overflow-hidden">
        <Image
          source={SplashImg}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>

      <Text className="text-black font-bold text-3xl">OkaBoka</Text>
    </View>
  );
}

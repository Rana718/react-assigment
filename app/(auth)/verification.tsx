import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import RectangleImg from '@/assets/images/Rectangle.png';

export default function VerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode === '1111') {
      router.push('/(auth)/profile');
    }
  };

  return (
    <View className="flex-1 bg-[#3DC4AB] px-6 pt-16">
      <View className="items-center mb-8">
        <View className="w-32 h-32 rounded-full bg-white items-center justify-center mb-6">
          <Image source={RectangleImg} className="w-24 h-24" resizeMode="contain" />
        </View>
        
        <Text className="text-black text-xl font-bold mb-2">Verify your number</Text>
        <Text className="text-black text-base text-center">
          We've sent a code to your phone
        </Text>
      </View>

      <View className="flex-row justify-between mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            className="w-12 h-12 bg-white rounded-lg text-center text-lg font-bold"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <Pressable 
        className="bg-black rounded-lg py-3 mb-6"
        onPress={handleVerify}
      >
        <Text className="text-white text-center font-semibold">Verify</Text>
      </Pressable>

      <Text className="text-black text-center mb-2">Didn't receive code? Resend</Text>
      <Text className="text-black text-center text-sm">
        You can request a new code in {countdown} seconds
      </Text>
    </View>
  );
}
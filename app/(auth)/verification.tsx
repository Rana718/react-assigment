import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import RectangleImg from '@/assets/images/Rectangle.png';

export default function VerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(4);
  const inputRefs = useRef<(TextInput | null)[]>([]);

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

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode === '1111') {
      router.push('/(auth)/profile');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#3DC4AB]" contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 64 }}>
      <View className="items-center mb-8">
        <View className="w-32 h-32 rounded-full bg-white items-center justify-center mb-6">
          <Image source={RectangleImg} className="w-24 h-24" resizeMode="contain" />
        </View>

        <Text className="text-black text-xl font-bold mb-2">Verify your number</Text>
        <Text className="text-black text-base text-center">
          We've sent a code to your phone
        </Text>
      </View>

      <View className="flex-row justify-center space-x-3 mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className="w-12 h-12 bg-white rounded-lg text-center text-lg font-bold border border-gray-300"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            returnKeyType="next"
            autoFocus={index === 0}
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
    </ScrollView>
  );
}

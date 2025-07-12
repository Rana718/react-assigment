import RectangleImg from '@/assets/images/Rectangle.png';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function VerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      setResendEnabled(false);
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearTimeout(timer);
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
      Toast.show({
        type: 'success',
        text1: 'Verification Successful',
        text2: 'Welcome! Your phone number has been verified',
        position: 'top',
        visibilityTime: 3000,
      });
      router.push('/(auth)/profile');
    } else if (otpCode.length === 4) {
      Toast.show({
        type: 'error',
        text1: 'Wrong OTP',
        text2: 'Please enter the correct verification code',
        position: 'top',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Incomplete OTP',
        text2: 'Please enter the complete 4-digit code',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const handleResend = () => {
    if (resendEnabled) {
      Toast.show({
        type: 'info',
        text1: 'Code Resent',
        text2: 'We’ve sent a new verification code.',
        position: 'top',
        visibilityTime: 2000,
      });
      setCountdown(60);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-[#3DC4AB]"
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 64,
        paddingBottom: 40,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center mt-16 mb-6">
        <View className="w-32 h-32 rounded-full bg-white items-center justify-center mb-6">
          <Image source={RectangleImg} className="w-24 h-24" resizeMode="contain" />
        </View>

        <Text className="text-black pt-5 text-xl font-bold">Verify your number</Text>
        <Text className="text-black text-sm text-center">
          We've sent a code to your phone
        </Text>
      </View>

      <View className="flex-row justify-center mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className="w-12 h-12 bg-white rounded-lg text-center text-xl font-bold border border-gray-300 mx-2"
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
        className="bg-black rounded-lg py-4 mb-6 w-2/3 self-center"
        onPress={handleVerify}
      >
        <Text className="text-white text-center font-semibold">Verify</Text>
      </Pressable>

      <Text className="text-black text-center mb-2">
        Didn't receive code?{' '}
        <Text
          className={`font-bold ${resendEnabled ? 'text-black' : 'text-gray-500'}`}
          onPress={handleResend}
        >
          Resend
        </Text>
      </Text>

      {countdown > 0 && (
        <Text className="text-black text-center text-sm">
          You can request a new code in {countdown} second{countdown !== 1 ? 's' : ''}
        </Text>
      )}
    </ScrollView>
  );
}

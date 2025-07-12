import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css'
import { useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import KeyboardDismissWrapper from '@/components/KeyboardDismissWrapper';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);
  }, [])

  if (!loaded || isSplashScreenVisible) {
    return <SplashScreen />;
  }

  return (
    <KeyboardDismissWrapper>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </KeyboardDismissWrapper>
  );
}

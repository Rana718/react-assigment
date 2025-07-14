import KeyboardDismissWrapper from '@/components/KeyboardDismissWrapper';
import SplashScreen from '@/components/SplashScreen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import '../global.css';

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
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

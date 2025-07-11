import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@global.css'
import { useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';

export default function RootLayout() {
  const [isSpalshScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(()=>{
    setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);
  },[])

  if (!loaded || !isSpalshScreenVisible) {
    <SplashScreen/>
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

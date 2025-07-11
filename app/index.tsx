import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      if (isAuthenticated === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/signin');
      }
    } catch (error) {
      router.replace('/(auth)/signin');
    }
  };

  return null;
}
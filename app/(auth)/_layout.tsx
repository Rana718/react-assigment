import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="about-step1" options={{ headerShown: false }} />
      <Stack.Screen name="about-step2" options={{ headerShown: false }} />
    </Stack>
  );
}
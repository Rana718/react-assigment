import { Link, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center bg-[#3DC4AB] px-4">
        <Text className="text-white text-5xl font-bold mb-4">404</Text>
        <Text className="text-white text-xl mb-6 text-center">
          Oops! Page not found.
        </Text>

        <Link href="/" asChild>
          <Pressable className="bg-white px-6 py-3 rounded-full shadow-md">
            <Text className="text-[#3DC4AB] text-base font-semibold">
              Go Home
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

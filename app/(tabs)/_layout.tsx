import { Tabs, router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Tabs.Screen name="index" />
      </Tabs>
      
      {/* Bottom Navigation */}
      <View className="bg-[#3DC4AB] px-4 py-3">
        <View className="flex-row justify-around">
          <Pressable className="items-center">
            <Text className="text-black font-semibold">Oka(you)</Text>
          </Pressable>
          <Pressable className="items-center">
            <Text className="text-black opacity-60">Bond</Text>
          </Pressable>
          <Pressable className="items-center">
            <Text className="text-black opacity-60">Oka's</Text>
          </Pressable>
        </View>
      </View>

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-20 right-6 w-14 h-14 bg-[#3DC4AB] rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/camera')}
      >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}

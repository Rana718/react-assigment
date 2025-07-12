import { Tabs, usePathname } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function TabLayout() {
  const pathname = usePathname();

  const hideFooterRoutes = ['/camera'];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="camera" options={{ headerShown: false }} />
      </Tabs>

      {!shouldHideFooter && (
        <View className="bg-[#3DC4AB] px-4 py-3 pb-8 border-t border-gray-200">
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
      )}
    </View>
  );
}

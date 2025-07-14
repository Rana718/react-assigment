import { Link, Tabs, usePathname } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const footerTabs = [
  { label: "Oka(you)", route: "/" },
  { label: "Bond", route: "/bond" },
  { label: "Oka's", route: "/okas" },
  { label: "Chats", route: "/chats" }
];

export default function TabLayout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const shouldHideFooter =
    pathname.includes('/camera') ||
    (pathname.includes('/chats/') && !pathname.endsWith('/chats')) ||
    pathname.includes('/call/');

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="camera" />
        <Tabs.Screen name="chats" />
      </Tabs>

      {!shouldHideFooter && (
        <Animated.View
          entering={FadeInUp}
          className="bg-[#3DC4AB] px-4 pt-3 border-t border-gray-200"
          style={{ paddingBottom: insets.bottom+15 }}
        >
          <View className="flex-row justify-around">
            {footerTabs.map(({ label, route }) => {
              const isActive = pathname === route;

              return (
                <Link
                  key={route}
                  href={route as any}
                  asChild
                >
                  <Pressable className="items-center">
                    <Text className={`text-black font-semibold ${isActive ? 'text-white font-bold' : 'opacity-60'}`}>
                      {label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

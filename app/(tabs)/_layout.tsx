import { Link, Tabs, usePathname } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const footerTabs = [
  { label: "Oka(you)", route: "/(tabs)/" },
  { label: "Bond", route: "/(tabs)/bond" },
  { label: "Oka's", route: "/(tabs)/okas" },
  { label: "Chats", route: "/(tabs)/chats" }
];

export default function TabLayout() {
  const pathname = usePathname();

  const hideFooterRoutes = ['/camera', '/chats/[chatid]', '/chats/call/[callid]'];
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
        <Tabs.Screen name="camera" />
        <Tabs.Screen name="chats" />
      </Tabs>

      {!shouldHideFooter && (
        <Animated.View
          entering={FadeInUp}
          className="bg-[#3DC4AB] px-4 py-3 pb-12 border-t border-gray-200"
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
                    <Text className={`text-black font-semibold ${isActive ? 'opacity-100 underline' : 'opacity-60'}`}>
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

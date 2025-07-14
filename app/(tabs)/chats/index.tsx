import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatListItem from '@/components/ChatListItem';
import { chats } from '@/constants/tempData';
import { Chat } from '@/types';

export default function ChatsIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [chatList, setChatList] = useState(chats);
    const [refreshing, setRefreshing] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const insets = useSafeAreaInsets();

    const filteredChats = chatList.filter(chat =>
        chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedChats = filteredChats.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const totalUnreadCount = chatList.reduce((total, chat) => total + chat.unreadCount, 0);

    const renderChatItem = ({ item }: { item: Chat }) => (
        <ChatListItem chat={item} />
    );

    const renderEmptyState = () => (
        <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="chatbubbles-outline" size={64} color="#ccc" />
            <Text className="text-gray-500 text-lg mt-4">No chats found</Text>
            <Text className="text-gray-400 text-sm mt-2 text-center px-8">
                {searchQuery ? 'Try searching with different keywords' : 'Start a new conversation'}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <View className="bg-white px-4 pb-5 pt-3 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                        <Text className="text-2xl font-bold text-gray-900">Chats</Text>
                        {totalUnreadCount > 0 && (
                            <View className="bg-[#3DC4AB] rounded-full min-w-[20px] h-5 justify-center items-center ml-2">
                                <Text className="text-white text-xs font-bold">
                                    {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View className="flex-row space-x-4">
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-vertical" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className={`flex-row items-center bg-gray-100 rounded-full px-4 ${isSearchFocused ? 'border-2 border-[#3DC4AB]' : ''
                    }`}>
                    <Ionicons name="search" size={20} color="#666" />
                    <TextInput
                        className="flex-1 ml-2 text-base truncate"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#666"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <FlatList
                data={sortedChats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                className="flex-1"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#3DC4AB']}
                        tintColor="#3DC4AB"
                    />
                }
                ListEmptyComponent={renderEmptyState}
            />

            <TouchableOpacity
                className="absolute bottom-6 right-6 w-14 h-14 bg-[#3DC4AB] rounded-full justify-center items-center shadow-lg"
                activeOpacity={0.8}
                style={{
                    shadowColor: '#3DC4AB',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                }}
            >
                <Ionicons name="chatbubble" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

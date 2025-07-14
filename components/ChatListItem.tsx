import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Chat, formatTime } from '../constants/tempData';

interface ChatListItemProps {
    chat: Chat;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
    return (
        <TouchableOpacity
            className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100 active:bg-gray-50"
            onPress={() => router.push(`/chats/${chat.id}`)}
            activeOpacity={0.7}
        >
            <View className="relative">
                <Image
                    source={{ uri: chat.user.profileImage }}
                    className="w-12 h-12 rounded-full"
                />
                {chat.user.isOnline && (
                    <View className="absolute bottom-0 right-0 w-3 h-3 bg-[#3DC4AB] rounded-full border-2 border-white" />
                )}
            </View>

            <View className="flex-1 ml-3">
                <View className="flex-row justify-between items-center mb-1">
                    <View className="flex-row items-center flex-1">
                        <Text className="text-gray-900 font-semibold text-base flex-1" numberOfLines={1}>
                            {chat.user.name}
                        </Text>
                        {chat.isPinned && (
                            <Ionicons name="pin" size={14} color="#3DC4AB" style={{ marginLeft: 4 }} />
                        )}
                    </View>
                    <Text className="text-gray-500 text-xs ml-2">
                        {formatTime(chat.lastMessage.timestamp)}
                    </Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="flex-1 flex-row items-center">
                        {chat.lastMessage.senderId === 'current-user' && (
                            <Ionicons
                                name={chat.lastMessage.isRead ? "checkmark-done" : "checkmark"}
                                size={16}
                                color={chat.lastMessage.isRead ? "#3DC4AB" : "#666"}
                                style={{ marginRight: 4 }}
                            />
                        )}
                        <Text
                            className={`text-sm flex-1 ${chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                                }`}
                            numberOfLines={1}
                        >
                            {chat.lastMessage.text}
                        </Text>
                    </View>

                    {chat.unreadCount > 0 && (
                        <View className="bg-[#3DC4AB] rounded-full min-w-[20px] h-5 justify-center items-center ml-2">
                            <Text className="text-white text-xs font-bold">
                                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

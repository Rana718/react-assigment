import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Message } from '../constants/tempData';

interface MessageBubbleProps {
    message: Message;
    isCurrentUser: boolean;
    showTime?: boolean;
    onDeleteMessage?: (messageId: string, deleteType: 'me' | 'everyone') => void;
}

export default function MessageBubble({ message, isCurrentUser, showTime, onDeleteMessage }: MessageBubbleProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteOptions, setShowDeleteOptions] = useState(false);

    const handleLongPress = () => {
        setShowOptions(true);
    };

    const handleCopyMessage = () => {
        setShowOptions(false);
    };

    const handleDeletePress = () => {
        setShowOptions(false);
        setShowDeleteOptions(true);
    };

    const handleDeleteForMe = () => {
        setShowDeleteOptions(false);
        onDeleteMessage?.(message.id, 'me');
    };

    const handleDeleteForEveryone = () => {
        setShowDeleteOptions(false);
        onDeleteMessage?.(message.id, 'everyone');
    };

    const closeAllOptions = () => {
        setShowOptions(false);
        setShowDeleteOptions(false);
    };

    return (
        <>
            <View className={`mb-1 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                {showTime && (
                    <Text className="text-xs text-gray-500 text-center w-full mb-2 mt-2">
                        {new Date(message.timestamp).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                )}

                <View className="relative">
                    <TouchableOpacity
                        onLongPress={handleLongPress}
                        activeOpacity={0.7}
                        className={`max-w-[80%] px-3 py-2 rounded-2xl ${showOptions ? 'opacity-90' : ''
                            } ${isCurrentUser
                                ? 'bg-[#3DC4AB] rounded-br-md'
                                : 'bg-white rounded-bl-md shadow-sm'
                            }`}
                        style={{ zIndex: showOptions ? 999 : 1 }}
                    >
                        <Text className={`text-base ${message.isDeleted
                            ? 'text-gray-500 italic'
                            : isCurrentUser
                                ? 'text-black'
                                : 'text-gray-900'
                            }`}>
                            {message.text}
                        </Text>

                        <View className={`flex-row items-center justify-end mt-1 ${isCurrentUser ? 'space-x-1' : ''}`}>
                            <Text className={`text-xs ${isCurrentUser ? 'text-gray-600' : 'text-gray-500'}`}>
                                {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </Text>
                            {isCurrentUser && (
                                <Ionicons
                                    name={message.isRead ? "checkmark-done" : "checkmark"}
                                    size={14}
                                    color={message.isRead ? "#4FC3F7" : "#9E9E9E"}
                                />
                            )}
                        </View>
                    </TouchableOpacity>

                    {showOptions && (
                        <View
                            className={`absolute ${isCurrentUser ? 'right-0' : 'left-0'} top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1`}
                            style={{ zIndex: 1000, elevation: 10 }}
                        >
                            <TouchableOpacity
                                className="flex-row items-center px-4 py-3 border-b border-gray-100"
                                onPress={handleCopyMessage}
                            >
                                <Ionicons name="copy-outline" size={18} color="#666" />
                                <Text className="ml-3 text-base text-gray-800">Copy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-row items-center px-4 py-3"
                                onPress={handleDeletePress}
                            >
                                <Ionicons name="trash-outline" size={18} color="#F44336" />
                                <Text className="ml-3 text-base text-red-500">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {showDeleteOptions && (
                        <View
                            className={`absolute ${isCurrentUser ? 'right-0' : 'left-0'} top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1`}
                            style={{ zIndex: 1001, elevation: 11 }}
                        >
                            <TouchableOpacity
                                className="flex-row items-center px-4 py-3 border-b border-gray-100"
                                onPress={handleDeleteForMe}
                            >
                                <Ionicons name="person-outline" size={18} color="#666" />
                                <Text className="ml-3 text-base text-gray-800">Delete for me</Text>
                            </TouchableOpacity>

                            {isCurrentUser && (
                                <TouchableOpacity
                                    className="flex-row items-center px-4 py-3"
                                    onPress={handleDeleteForEveryone}
                                >
                                    <Ionicons name="people-outline" size={18} color="#F44336" />
                                    <Text className="ml-3 text-base text-red-500">Delete for everyone</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                className="flex-row items-center px-4 py-3 border-t border-gray-100"
                                onPress={closeAllOptions}
                            >
                                <Ionicons name="close-outline" size={18} color="#666" />
                                <Text className="ml-3 text-base text-gray-800">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            {(showOptions || showDeleteOptions) && (
                <TouchableOpacity
                    className="absolute inset-0 w-screen h-screen"
                    style={{ zIndex: 998 }}
                    onPress={closeAllOptions}
                    activeOpacity={1}
                />
            )}
        </>
    );
}

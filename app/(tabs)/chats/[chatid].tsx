import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MessageBubble from '../../../components/MessageBubble';
import { chats, currentUser, Message } from '../../../constants/tempData';

export default function ChatConversation() {
    const { chatid } = useLocalSearchParams();
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const chat = chats.find(c => c.id === chatid);
        if (chat) {
            setCurrentChat(chat);
            setMessages(chat.messages);
        }
    }, [chatid]);

    useEffect(() => {
        let keyboardDidShowListener: any;
        let keyboardDidHideListener: any;

        if (Platform.OS === 'ios') {
            keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            });
            keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => {
                setKeyboardHeight(0);
            });
        } else {
            keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            });
            keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
                setKeyboardHeight(0);
            });
        }

        return () => {
            keyboardDidShowListener?.remove();
            keyboardDidHideListener?.remove();
        };
    }, []);

    const sendMessage = () => {
        if (messageText.trim().length === 0) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            text: messageText.trim(),
            timestamp: new Date().toISOString(),
            isRead: false,
            type: 'text',
        };

        setMessages(prev => [...prev, newMessage]);
        setMessageText('');

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);

            const replies = [
                "Thanks for your message!",
                "Got it!",
                "I'll get back to you soon",
                "Sounds good!",
                "Perfect!",
            ];

            const autoReply: Message = {
                id: `msg-auto-${Date.now()}`,
                senderId: currentChat?.user.id || '1',
                text: replies[Math.floor(Math.random() * replies.length)],
                timestamp: new Date().toISOString(),
                isRead: false,
                type: 'text',
            };

            setMessages(prev => [...prev, autoReply]);
        }, 2000);

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const handleDeleteMessage = (messageId: string, deleteType: 'me' | 'everyone') => {
        if (deleteType === 'everyone') {
            setMessages(prev => prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, text: '🚫 This message was deleted', isDeleted: true }
                    : msg
            ));
        } else {
            setMessages(prev => prev.filter(msg => msg.id !== messageId));
        }
    };

    const handleCall = (isVideo: boolean) => {
        const callId = Math.random().toString(36).substring(7);
        const callType = isVideo ? 'video' : 'voice';
        router.push(`/(tabs)/chats/call/${callId}?type=${callType}&userId=${chatid}&userName=${currentChat?.user.name}` as any);
    };

    const renderMessage = ({ item, index }: { item: Message; index: number }) => {
        const isCurrentUser = item.senderId === currentUser.id;
        const showTime = index === 0 ||
            new Date(item.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 3600000;

        return (
            <MessageBubble
                message={item}
                isCurrentUser={isCurrentUser}
                showTime={showTime}
                onDeleteMessage={handleDeleteMessage}
            />
        );
    };

    const renderTypingIndicator = () => {
        if (!isTyping) return null;

        return (
            <View className="flex-row items-center mb-2">
                <View className="bg-gray-200 rounded-2xl rounded-bl-md px-3 py-2">
                    <View className="flex-row space-x-1">
                        <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                        <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </View>
                </View>
            </View>
        );
    };

    if (!currentChat) {
        return (
            <View className="flex-1 bg-white justify-center items-center" style={{ paddingTop: insets.top }}>
                <StatusBar barStyle="light-content" backgroundColor="#3DC4AB" />
                <Text className="text-gray-500">Chat not found</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="light-content" backgroundColor="#3DC4AB" />

            <View className="bg-[#3DC4AB] px-4 py-3 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="mr-3">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center flex-1" activeOpacity={0.7}>
                    <View className="relative">
                        <Image
                            source={{ uri: currentChat.user.profileImage }}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        {currentChat.user.isOnline && (
                            <View className="absolute bottom-0 right-2 w-3 h-3 bg-white rounded-full border border-[#3DC4AB]" />
                        )}
                    </View>
                    <View className="flex-1">
                        <Text className="text-white font-semibold text-lg truncate">
                            {currentChat.user.name}
                        </Text>
                        <Text className="text-white opacity-80 text-sm">
                            {isTyping ? 'typing...' : (currentChat.user.isOnline ? 'Online' : `Last seen ${currentChat.user.lastSeen || 'recently'}`)}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View className="flex-row gap-5">
                    <TouchableOpacity onPress={() => handleCall(false)}>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCall(true)}>
                        <Ionicons name="videocam" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView 
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                <View className="flex-1 bg-[#E5DDD5]">
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        className="flex-1 px-4"
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                        ListFooterComponent={renderTypingIndicator}
                        contentContainerStyle={{ 
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexGrow: 1
                        }}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>

                <View
                    className="bg-white border-t border-gray-200"
                    style={{
                        paddingBottom: Math.max(insets.bottom, 8)
                    }}
                >
                    <View className="flex-row items-end px-2 py-2">
                        <View className="flex-1 flex-row items-end bg-white rounded-3xl border border-gray-300 px-2 py-1 mx-1 shadow-sm">
                            <TouchableOpacity className="p-2">
                                <Ionicons name="happy-outline" size={24} color="#8E8E93" />
                            </TouchableOpacity>

                            <TextInput
                                className="flex-1 text-base py-2 px-2 max-h-32"
                                placeholder="Type a message"
                                value={messageText}
                                onChangeText={setMessageText}
                                multiline
                                placeholderTextColor="#8E8E93"
                                onSubmitEditing={sendMessage}
                                style={{ 
                                    minHeight: 40,
                                    lineHeight: 20,
                                    textAlignVertical: 'top'
                                }}
                            />

                            <TouchableOpacity className="p-2">
                                <Ionicons name="attach" size={24} color="#8E8E93" />
                            </TouchableOpacity>

                            {messageText.trim().length === 0 && (
                                <TouchableOpacity className="p-2">
                                    <Ionicons name="camera" size={24} color="#8E8E93" />
                                </TouchableOpacity>
                            )}
                        </View>

                        {messageText.trim().length > 0 ? (
                            <TouchableOpacity
                                onPress={sendMessage}
                                className="w-12 h-12 bg-[#25D366] rounded-full justify-center items-center ml-1 shadow-md"
                            >
                                <Ionicons name="send" size={20} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity className="w-12 h-12 bg-[#25D366] rounded-full justify-center items-center ml-1 shadow-md">
                                <Ionicons name="mic" size={22} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

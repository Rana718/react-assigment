import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Message } from '../constants/tempData';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showTime?: boolean;
  onDeleteMessage?: (messageId: string, deleteType: 'me' | 'everyone') => void;
}

export default function MessageBubble({ message, isCurrentUser, showTime, onDeleteMessage }: MessageBubbleProps) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const handleLongPress = () => {
    setShowOptionsModal(true);
  };

  const handleCopyMessage = () => {
    // Copy to clipboard functionality can be added here
    setShowOptionsModal(false);
    Alert.alert('Copied', 'Message copied to clipboard');
  };

  const handleDeleteMessage = () => {
    setShowOptionsModal(false);
    Alert.alert(
      'Delete Message',
      'Choose delete option',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete for me',
          onPress: () => onDeleteMessage?.(message.id, 'me'),
        },
        ...(isCurrentUser ? [{
          text: 'Delete for everyone',
          onPress: () => onDeleteMessage?.(message.id, 'everyone'),
          style: 'destructive' as const,
        }] : []),
      ]
    );
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

        <TouchableOpacity
          onLongPress={handleLongPress}
          activeOpacity={0.7}
          className={`max-w-[80%] px-3 py-2 rounded-2xl ${isCurrentUser
            ? 'bg-[#3DC4AB] rounded-br-md'
            : 'bg-white rounded-bl-md shadow-sm'
            }`}
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
      </View>

      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setShowOptionsModal(false)}
        >
          <View className="bg-white rounded-lg mx-8 py-4">
            <TouchableOpacity
              className="px-6 py-3 border-b border-gray-200"
              onPress={handleCopyMessage}
            >
              <View className="flex-row items-center">
                <Ionicons name="copy-outline" size={20} color="#333" />
                <Text className="ml-3 text-base text-gray-800">Copy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-6 py-3"
              onPress={handleDeleteMessage}
            >
              <View className="flex-row items-center">
                <Ionicons name="trash-outline" size={20} color="#F44336" />
                <Text className="ml-3 text-base text-red-500">Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

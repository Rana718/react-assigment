import { Ionicons } from '@expo/vector-icons';
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Share,
  Text,
  View,
} from 'react-native';

export default function CameraScreen() {
  const [selectedMode, setSelectedMode] = useState<'image' | 'video' | 'text'>('image');
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'video'>('image');
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryPermission.status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant gallery access to use this feature');
      }

      if (!permission?.granted) {
        await requestPermission();
      }
      if (!micPermission?.granted) {
        await requestMicPermission();
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      if (selectedMode === 'video') {
        if (isRecording) {
          cameraRef.current.stopRecording();
          setIsRecording(false);
        } else {
          setIsRecording(true);
          const video = await cameraRef.current.recordAsync();
          setIsRecording(false);
          if (video) {
            setSelectedImage(video.uri);
            setSelectedMediaType('video');
            setShowImagePreview(true);
          }
        }
      } else {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setSelectedImage(photo.uri);
          setSelectedMediaType('image');
          setShowImagePreview(true);
        }
      }
    } catch {
      setIsRecording(false);
      Alert.alert('Error', selectedMode === 'video' ? 'Failed to record video' : 'Failed to take picture');
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setSelectedMediaType(result.assets[0].type === 'video' ? 'video' : 'image');
      setShowImagePreview(true);
      setShowGallery(false);
    }
  };

  const toggleCameraType = () =>
    setCameraType(current => (current === 'back' ? 'front' : 'back'));

  const handleCrop = () =>
    Alert.alert('Crop', 'Crop functionality would be implemented here');

  const handleSave = async () => {
    if (!selectedImage) return;
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(selectedImage);
        Alert.alert('Success', 'Image saved to gallery!');
      } else {
        Alert.alert('Permission needed', 'Please grant permission to save to gallery');
      }
    } catch {
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const handleShare = async () => {
    if (!selectedImage) return;
    try {
      await Share.share({
        url: selectedImage,
        message: 'Check out this image!',
      });
    } catch {
      Alert.alert('Error', 'Failed to share image');
    }
  };

  if (!permission || !micPermission) return <View className="flex-1 bg-black" />;

  if (!permission.granted || !micPermission.granted) {
    return <View className="flex-1 bg-black" />;
  }

  const ActionButton = ({
    icon,
    onPress,
    color = 'white',
    bg = 'bg-gray-100',
  }: {
    icon: any;
    onPress: () => void;
    color?: string;
    bg?: string;
  }) => (
    <Pressable onPress={onPress} className="items-center py-3 px-4">
      <View className={`w-12 h-12 ${bg} rounded-full items-center justify-center mb-2`}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
    </Pressable>
  );

  const ModeButton = (mode: 'text' | 'image' | 'video') => (
    <Pressable key={mode} onPress={() => setSelectedMode(mode)} className="items-center flex-1">
      <Text
        className={`text-lg font-semibold ${selectedMode === mode ? 'text-[#3DC4AB]' : 'text-white'
          }`}
      >
        {mode.toUpperCase()}
      </Text>
      {selectedMode === mode && <View className="h-1 w-full bg-[#3DC4AB] mt-2 rounded-full" />}
    </Pressable>
  );

  return (
    <View className="flex-1 bg-black">
      <View className="absolute top-12 left-4 z-10 bg-white/60 rounded-full p-2">
        <Pressable onPress={() => router.back()} className="p-1">
          <Ionicons name="arrow-back" size={28} color="black" />
        </Pressable>
      </View>

      <View className="flex-1 overflow-hidden relative">
        {selectedMode === 'text' ? (
          <View className="flex-1 bg-gray-800 items-center justify-center">
            <Ionicons name="text" size={80} color="#666" />
            <Text className="text-gray-400 mt-4">Text Mode</Text>
          </View>
        ) : (
          !showImagePreview && (
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing={cameraType}
              mode={selectedMode === 'video' ? 'video' : 'picture'}
            />
          )
        )}
      </View>

      {!showImagePreview && (
        <View className="px-4 py-4 bg-black">
          <View className="flex-row justify-between items-center">
            <Pressable
              className="w-16 h-16 bg-gray-700 rounded-xl items-center justify-center"
              onPress={openGallery}
            >
              <Ionicons name="images" size={24} color="white" />
            </Pressable>
            <Pressable
              className="w-20 h-20 bg-[#3DC4AB] rounded-full items-center justify-center"
              onPress={takePicture}
            >
              <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
                {selectedMode === 'video' ? (
                  isRecording ? (
                    <View className="w-6 h-6 bg-red-500 rounded-sm" />
                  ) : (
                    <View className="w-6 h-6 bg-red-500 rounded-full" />
                  )
                ) : (
                  <Ionicons name="camera" size={24} color="black" />
                )}
              </View>
            </Pressable>
            <Pressable
              className="w-16 h-16 bg-gray-700 rounded-xl items-center justify-center"
              onPress={toggleCameraType}
            >
              <Ionicons name="camera-reverse" size={24} color="white" />
            </Pressable>
          </View>

          <View className="flex-row justify-center space-x-12 my-6">
            {['text', 'image', 'video'].map(mode => ModeButton(mode as any))}
          </View>
        </View>
      )}

      <Modal visible={showGallery} animationType="slide" transparent>
        <View className="flex-1 bg-black bg-opacity-95 pt-16 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Gallery</Text>
            <Pressable onPress={() => setShowGallery(false)}>
              <Ionicons name="close" size={28} color="white" />
            </Pressable>
          </View>
          <Pressable className="bg-[#3DC4AB] py-3 rounded-lg mb-4" onPress={openGallery}>
            <Text className="text-white text-center font-semibold">Choose from Gallery</Text>
          </Pressable>
        </View>
      </Modal>

      {showImagePreview && selectedImage && (
        <Modal visible={showImagePreview} animationType="slide">
          <View className="flex-1 bg-white">
            <View className="absolute top-6 left-4 z-10 bg-white/60 rounded-full p-2">
              <Pressable
                onPress={() => {
                  setShowImagePreview(false);
                  setSelectedImage(null);
                }}
                className="p-1"
              >
                <Ionicons name="arrow-back" size={28} color="black" />
              </Pressable>
            </View>
            <View className="flex-1">
              {selectedMediaType === 'video' ? (
                <View className="flex-1 bg-black items-center justify-center w-full">
                  <Text className="text-white text-lg">Video Preview</Text>
                  <Text className="text-gray-400 text-sm mt-2">Video playback will be implemented</Text>
                </View>
              ) : (
                <Image
                  source={{ uri: selectedImage }}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              )}
            </View>

            <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center px-6 pb-6 bg-white border-t border-gray-200">
              <View className="items-center">
                <ActionButton icon="crop" onPress={handleCrop} color="white" bg="bg-gray-700" />
                <Text className="text-sm text-gray-700 leading-none -mt-3">Crop</Text>
              </View>

              <View className="items-center">
                <ActionButton icon="download" onPress={handleSave} bg="bg-[#3DC4AB]" color="white" />
                <Text className="text-sm text-gray-700 leading-none -mt-3">Save</Text>
              </View>

              <View className="items-center">
                <ActionButton icon="share-social" onPress={handleShare} color="white" bg="bg-gray-700" />
                <Text className="text-sm text-gray-700 leading-none -mt-3">Share</Text>
              </View>
            </View>


          </View>
        </Modal>

      )}
    </View>
  );
}

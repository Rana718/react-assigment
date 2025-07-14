import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { users } from '../../../../constants/tempData';


export default function CallScreen() {
    const { callid, type, userId, userName } = useLocalSearchParams();
    const [isVideoCall, setIsVideoCall] = useState(type === 'video');
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(type === 'video');
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [callDuration, setCallDuration] = useState(0);
    const [isCallConnected, setIsCallConnected] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showControls, setShowControls] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);
    const [isLocalVideoLarge, setIsLocalVideoLarge] = useState(false);

    const callUser = users.find(u => u.id === userId) || users[0];
    const intervalRef = useRef<number | null>(null);
    const controlsTimeoutRef = useRef<number | null>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        // Simulate call connection after 2 seconds
        const connectTimer = setTimeout(() => {
            setIsCallConnected(true);
            startCallTimer();
        }, 2000);

        // Start pulse animation for connecting state
        if (!isCallConnected) {
            startPulseAnimation();
        }

        return () => {
            clearTimeout(connectTimer);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVideoCall && showControls && isCallConnected) {
            // Clear any existing timeout
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
            
            // Auto-hide controls after 4 seconds in video call only when call is connected
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }, 4000);
        }

        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [showControls, isVideoCall, isCallConnected]);

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const startCallTimer = () => {
        intervalRef.current = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
    };

    const formatCallDuration = (seconds:number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const endCall = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        router.back();
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleCamera = () => {
        if (isVideoCall) {
            setIsCameraOn(!isCameraOn);
        }
    };

    const toggleSpeaker = () => {
        setIsSpeakerOn(!isSpeakerOn);
    };

    const switchCamera = () => {
        setIsFrontCamera(!isFrontCamera);
    };

    const upgradeToVideo = () => {
        setIsVideoCall(true);
        setIsCameraOn(true);
        setShowControls(true);
        // Reset fade animation to show controls
        fadeAnim.setValue(1);
    };

    const toggleControlsVisibility = () => {
        // Clear any existing timeout when user manually toggles
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        
        const newShowControls = !showControls;
        setShowControls(newShowControls);
        
        Animated.timing(fadeAnim, {
            toValue: newShowControls ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        
        // If showing controls, set timeout to hide them again
        if (newShowControls && isVideoCall && isCallConnected) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }, 4000);
        }
    };

    const minimizeCall = () => {
        setIsMinimized(true);
    };

    const switchVideoPosition = () => {
        setIsLocalVideoLarge(!isLocalVideoLarge);
    };

    if (hasPermission === null) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <Text className="text-white text-base">Requesting camera permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <Text className="text-white text-center px-5 mb-5 text-base">
                    Camera permission is required for video calls
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-red-600 px-6 py-3 rounded-3xl"
                >
                    <Text className="text-white font-semibold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Time Display */}
            <View className="absolute top-12 left-0 right-0 z-50">
                <Text className="text-white text-center text-lg font-medium">
                    {isCallConnected ? formatCallDuration(callDuration) : 'Connecting...'}
                </Text>
            </View>

            {/* Back Button - Always visible */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="absolute top-12 left-4 z-50 w-10 h-10 rounded-full bg-black bg-opacity-50 justify-center items-center"
            >
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1"
                activeOpacity={1}
                onPress={isVideoCall ? toggleControlsVisibility : undefined}
            >
                {isVideoCall ? (
                    // Video Call Layout
                    <View className="flex-1 relative">
                        {/* Main Video (Large) */}
                        <View className="flex-1 relative">
                            {isLocalVideoLarge ? (
                                // Local video as main
                                <View className="flex-1">
                                    {isCameraOn ? (
                                        <CameraView
                                            className="flex-1"
                                            facing={isFrontCamera ? 'front' : 'back'}
                                        />
                                    ) : (
                                        <View className="flex-1 bg-black justify-center items-center">
                                            <Ionicons name="videocam-off" size={80} color="#666" />
                                            <Text className="text-white text-lg mt-4">Camera is off</Text>
                                        </View>
                                    )}
                                    {isMuted && (
                                        <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 rounded-full p-3">
                                            <Ionicons name="mic-off" size={32} color="white" />
                                        </View>
                                    )}
                                </View>
                            ) : (
                                // Remote video as main (with user's profile image as background)
                                <>
                                    <Image
                                        source={{ uri: callUser.profileImage }}
                                        className="w-full h-full absolute"
                                        blurRadius={10}
                                    />
                                    <View className="flex-1 bg-black bg-opacity-30 justify-center items-center">
                                        <Animated.View className="items-center" style={{ transform: [{ scale: isCallConnected ? 1 : pulseAnim }] }}>
                                            <Image
                                                source={{ uri: callUser.profileImage }}
                                                className="rounded-full mb-4"
                                                style={{ width: 120, height: 120 }}
                                            />
                                            <Text className="text-white text-2xl font-semibold mb-2">{callUser.name}</Text>
                                            {!isCallConnected && (
                                                <Text className="text-white text-opacity-80 text-base">Connecting...</Text>
                                            )}
                                        </Animated.View>
                                    </View>
                                </>
                            )}
                        </View>

                        {/* Small Video (Picture in Picture) */}
                        <TouchableOpacity
                            onPress={switchVideoPosition}
                            className="absolute top-20 right-4 rounded-xl overflow-hidden "
                            style={{ width: 120, height: 160 }}
                        >
                            {isLocalVideoLarge ? (
                                // Remote video as small
                                <View className="flex-1 relative">
                                    <Image
                                        source={{ uri: callUser.profileImage }}
                                        className="w-full h-full"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            ) : (
                                // Local video as small
                                <View className="flex-1 relative">
                                    {isCameraOn ? (
                                        <CameraView
                                            className="flex-1"
                                            facing={isFrontCamera ? 'front' : 'back'}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    ) : (
                                        <View className="flex-1 bg-gray-800 justify-center items-center">
                                            <Ionicons name="videocam-off" size={24} color="#666" />
                                        </View>
                                    )}
                                    {isMuted && (
                                        <View className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1">
                                            <Ionicons name="mic-off" size={16} color="white" />
                                        </View>
                                    )}
                                </View>
                            )}
                            
                            {/* Switch camera button for local video */}
                            {!isLocalVideoLarge && isCameraOn && (
                                <TouchableOpacity
                                    onPress={switchCamera}
                                    className="absolute bottom-2 right-2 rounded-full bg-black bg-opacity-50 justify-center items-center"
                                    style={{ width: 32, height: 32 }}
                                >
                                    <Ionicons name="camera-reverse" size={16} color="white" />
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Voice Call Layout
                    <View className="flex-1 relative">
                        {/* Background */}
                        <Image
                            source={{ uri: callUser.profileImage }}
                            className="w-full h-full absolute"
                            blurRadius={20}
                        />
                        <View className="absolute inset-0 bg-black bg-opacity-70" />

                        {/* Profile Section */}
                        <View className="flex-1 justify-center items-center px-10">
                            <Animated.View className="mb-8" style={{ transform: [{ scale: isCallConnected ? 1 : pulseAnim }] }}>
                                <View className="relative">
                                    <Image
                                        source={{ uri: callUser.profileImage }}
                                        className="rounded-full"
                                        style={{ width: 180, height: 180 }}
                                    />
                                    {isMuted && (
                                        <View className="absolute bottom-2 right-2 bg-black bg-opacity-70 rounded-full p-3">
                                            <Ionicons name="mic-off" size={24} color="white" />
                                        </View>
                                    )}
                                </View>
                            </Animated.View>

                            <Text className="text-white text-3xl font-semibold mb-2 text-center">{callUser.name}</Text>
                            <Text className="text-white text-opacity-80 text-lg text-center">
                                {isCallConnected ? formatCallDuration(callDuration) : 'Calling...'}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>

            {/* Call Controls */}
            {(!isVideoCall || showControls) && (
                <Animated.View 
                    className="absolute bottom-10 left-0 right-0 px-10"
                    style={{ 
                        opacity: isVideoCall ? fadeAnim : 1,
                        pointerEvents: (!isVideoCall || showControls) ? 'auto' : 'none'
                    }}
                >
                    <View className="flex-row justify-between items-center">
                        {/* Speaker */}
                        <TouchableOpacity onPress={toggleSpeaker} className="items-center">
                            <View className={`w-15 h-15 rounded-full justify-center items-center ${isSpeakerOn ? 'bg-green-600' : 'bg-white/20'}`}>
                                <Ionicons 
                                    name={isSpeakerOn ? "volume-high" : "volume-low"} 
                                    size={28} 
                                    color="white" 
                                />
                            </View>
                        </TouchableOpacity>

                        {/* Video */}
                        <TouchableOpacity
                            onPress={isVideoCall ? toggleCamera : upgradeToVideo}
                            className="items-center"
                            disabled={!isVideoCall && !isCallConnected}
                        >
                            <View className={`w-15 h-15 rounded-full justify-center items-center ${
                                !isVideoCall ? 'bg-gray-700' : 
                                (isVideoCall && !isCameraOn) ? 'bg-red-600' : 'bg-white/20'
                            }`}>
                                <Ionicons
                                    name={isVideoCall ? (isCameraOn ? "videocam" : "videocam-off") : "videocam"}
                                    size={28}
                                    color={!isVideoCall ? "#666" : "white"}
                                />
                            </View>
                        </TouchableOpacity>

                        {/* Mute */}
                        <TouchableOpacity
                            onPress={toggleMute}
                            className="items-center"
                        >
                            <View className={`w-15 h-15 rounded-full justify-center items-center ${isMuted ? 'bg-red-600' : 'bg-white/20'}`}>
                                <Ionicons
                                    name={isMuted ? "mic-off" : "mic"}
                                    size={28}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>

                        {/* End Call */}
                        <TouchableOpacity
                            onPress={endCall}
                            className="items-center"
                        >
                            <View className="w-15 h-15 rounded-full bg-red-600 justify-center items-center">
                                <Ionicons name="call" size={28} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
}
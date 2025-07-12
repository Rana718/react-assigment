import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';

const RenderImages = (images: string[], postId: number) => {
    const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
    const isExpanded = expandedPosts.includes(postId);

    const toggleExpanded = (postId: number) => {
        setExpandedPosts((prev) =>
            prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
        );
    };

    const initialImages = images.slice(0, 7);
    const extraImages = isExpanded ? images.slice(7, 15) : [];

    return (
        <View className="mt-3">
            
            <View className="flex-row h-40 space-x-1">
               
                <View className="flex-2 space-y-1">
                    <View className="flex-row space-x-1">
                        {initialImages[0] && (
                            <Image source={{ uri: initialImages[0] }} className="flex-1 h-20 rounded-lg" />
                        )}
                        {initialImages[1] && (
                            <Image source={{ uri: initialImages[1] }} className="flex-1 h-20 rounded-lg" />
                        )}
                    </View>
                    <View className="flex-row space-x-1">
                        {initialImages[2] && (
                            <Image source={{ uri: initialImages[2] }} className="flex-1 h-20 rounded-lg" />
                        )}
                        {initialImages[3] && (
                            <Image source={{ uri: initialImages[3] }} className="flex-1 h-20 rounded-lg" />
                        )}
                    </View>
                </View>

                
                {initialImages[4] && (
                    <Image source={{ uri: initialImages[4] }} className="w-[23%] h-full rounded-lg" />
                )}

                
                <View className="flex-1 justify-between space-y-1">
                    {initialImages[5] && (
                        <Image source={{ uri: initialImages[5] }} className="w-full h-[77px] rounded-lg" />
                    )}
                    {initialImages[6] && (
                        <Image source={{ uri: initialImages[6] }} className="w-full h-[77px] rounded-lg" />
                    )}
                </View>
            </View>

            
            {isExpanded && (
                <View className="mt-3 space-y-1">
                    <View className="flex-row justify-between">
                        {extraImages.slice(0, 4).map((img, idx) => (
                            <Image
                                key={`row1-${idx}`}
                                source={{ uri: img }}
                                className="w-[23.5%] aspect-square rounded-lg"
                            />
                        ))}
                    </View>
                    <View className="flex-row justify-between">
                        {extraImages.slice(4, 8).map((img, idx) => (
                            <Image
                                key={`row2-${idx}`}
                                source={{ uri: img }}
                                className="w-[23.5%] aspect-square rounded-lg"
                            />
                        ))}
                    </View>
                </View>
            )}

            
            {!isExpanded && images.length > 7 && (
                <Pressable
                    className="flex-row items-center justify-center mt-2"
                    onPress={() => toggleExpanded(postId)}
                >
                    <Text className="text-gray-600 mr-2">{images.length - 7} More Moments</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
            )}
        </View>
    );
};

export default RenderImages;

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const RenderImages = (images: string[], postId: number) => {
    const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
    const isExpanded = expandedPosts.includes(postId);
    const displayImages = isExpanded ? images : images.slice(0, 7);

    const toggleExpanded = (postId: number) => {
        setExpandedPosts(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const renderImage = (uri: string, className: string, key: number) => (
        <Image
            key={key}
            source={{ uri }}
            className={className}
            resizeMode="cover"
        />
    );

    const renderRowImages = (start: number, end: number, rowClass: string) => (
        <View className={rowClass}>
            {images.slice(start, end).map((img, i) =>
                renderImage(img, 'flex-1 mx-1 rounded-lg h-full', start + i)
            )}
        </View>
    );

    const renderGrid = () => (
        <View className="flex-row h-[160px] mb-2">
            <View className="flex-[2] mr-1">
                {[0, 2].map((start, rowIndex) => (
                    <View key={rowIndex} className="flex-row flex-1 mb-1">
                        {[0, 1].map(col => {
                            const index = start + col;
                            return (
                                displayImages[index] &&
                                renderImage(
                                    displayImages[index],
                                    `flex-1 ${col === 0 ? 'mr-1' : 'ml-1'} rounded-lg`,
                                    index
                                )
                            );
                        })}
                    </View>
                ))}
            </View>

            {displayImages[4] && (
                <View className="flex-1 mx-1 relative">
                    {renderImage(displayImages[4], 'flex-1 rounded-lg h-full', 4)}
                    <View className="absolute bottom-0 bg-white/40 ">
                        <Text className="font-bold text-center">
                            Best Moment Of The Day
                        </Text>
                    </View>
                </View>
            )}

            <View className="flex-1 ml-1">
                {[5, 6].map(index =>
                    displayImages[index] &&
                    renderImage(
                        displayImages[index],
                        `flex-1 ${index === 5 ? 'mb-1' : ''} rounded-lg w-full`,
                        index
                    )
                )}
            </View>
        </View>
    );

    return (
        <View className="mt-3">
            {isExpanded && (
                <Pressable
                    className="flex-row items-center justify-center mb-3"
                    onPress={() => toggleExpanded(postId)}
                >
                    <Text className="text-gray-600 mr-2">Close</Text>
                    <Ionicons name="close" size={16} color="#666" />
                </Pressable>
            )}

            {renderGrid()}

            {!isExpanded && images.length > 7 && (
                <Pressable
                    className="flex-row items-center justify-center mt-2"
                    onPress={() => toggleExpanded(postId)}
                >
                    <Text className="text-gray-600 mr-2">
                        {images.length - 7} More Moments
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
            )}

            {isExpanded && images.length > 7 && (
                <>
                    {renderRowImages(7, 11, 'flex-row h-[80px] mb-1')}
                    {images.length > 11 && renderRowImages(11, 15, 'flex-row h-[80px]')}
                </>
            )}
        </View>
    );
};

export default RenderImages;

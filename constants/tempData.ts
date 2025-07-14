import { User, Message, Chat } from "@/types";

export const currentUser: User = {
    id: 'current-user',
    name: 'You',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
};

export const users: User[] = [
    {
        id: '1',
        name: 'Jack Thompson',
        profileImage: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '2',
        name: 'Bob Smith',
        profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '2 hours ago',
    },
    {
        id: '3',
        name: 'Carol Davis',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '4',
        name: 'David Wilson',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '1 day ago',
    },
    {
        id: '5',
        name: 'Emma Brown',
        profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '6',
        name: 'Frank Miller',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '5 minutes ago',
    },
    {
        id: '7',
        name: 'Grace Lee',
        profileImage: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '8',
        name: 'Hannah White',
        profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '3 minutes ago',
    },
    {
        id: '9',
        name: 'Ian Clark',
        profileImage: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '10',
        name: 'Julia Adams',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: 'just now',
    },
    {
        id: '11',
        name: 'Kevin Harris',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '10 minutes ago',
    },
    {
        id: '12',
        name: 'Laura Scott',
        profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '13',
        name: 'Mike Taylor',
        profileImage: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '4 hours ago',
    },
    {
        id: '14',
        name: 'Nina Foster',
        profileImage: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '15',
        name: 'Oscar Brown',
        profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '6 hours ago',
    },
    {
        id: '16',
        name: 'Paula Green',
        profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '17',
        name: 'Quincy Reed',
        profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '12 hours ago',
    },
    {
        id: '18',
        name: 'Rachel Adams',
        profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '19',
        name: 'Steve Rogers',
        profileImage: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '1 week ago',
    },
    {
        id: '20',
        name: 'Tina Allen',
        profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '21',
        name: 'Umar Shaikh',
        profileImage: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '22',
        name: 'Violet Moore',
        profileImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: 'yesterday',
    },
    {
        id: '23',
        name: 'Wesley Knight',
        profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '24',
        name: 'Xenia Rhodes',
        profileImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '1 hour ago',
    },
    {
        id: '25',
        name: 'Yusuf Khan',
        profileImage: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '26',
        name: 'Zara Malik',
        profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '27',
        name: 'Alan Walker',
        profileImage: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '2 days ago',
    },
    {
        id: '28',
        name: 'Bella Swan',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '29',
        name: 'Charlie Puth',
        profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '8 minutes ago',
    },
    {
        id: '30',
        name: 'Diana Prince',
        profileImage: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '31',
        name: 'Ethan Hunt',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '32',
        name: 'Farah Naz',
        profileImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '25 minutes ago',
    },
    {
        id: '33',
        name: 'George Miller',
        profileImage: 'https://images.unsplash.com/photo-1520975698519-42fbcb03c43f?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '34',
        name: 'Huda Shaikh',
        profileImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
    {
        id: '35',
        name: 'Imran Khan',
        profileImage: 'https://images.unsplash.com/photo-1603415526960-f7e0328fddb2?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '6 days ago',
    },
    {
        id: '36',
        name: 'Jane Austen',
        profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
    },
];


const generateMessages = (userId: string, count: number): Message[] => {
    const messages: Message[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const isFromCurrentUser = Math.random() > 0.5;
        const timestamp = new Date(now.getTime() - (count - i) * 60000 * Math.random() * 60);

        messages.push({
            id: `msg-${userId}-${i}`,
            senderId: isFromCurrentUser ? currentUser.id : userId,
            text: getRandomMessage(),
            timestamp: timestamp.toISOString(),
            isRead: Math.random() > 0.3,
            type: 'text',
        });
    }

    return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

const getRandomMessage = (): string => {
    const messages = [
        "Hey! How are you doing?",
        "That sounds great!",
        "I'll be there in 10 minutes",
        "Thanks for letting me know",
        "See you later!",
        "What time works for you?",
        "Perfect, let's do it",
        "I'm running a bit late",
        "No worries at all",
        "Looking forward to it!",
        "Can we reschedule?",
        "Absolutely!",
        "That's awesome news",
        "I'll call you later",
        "Send me the details",
        "Got it, thanks!",
        "Let me check my schedule",
        "Sounds like a plan",
        "I'll get back to you",
        "Have a great day!",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
};

export const chats: Chat[] = users.map((user, index) => {
    const messages = generateMessages(user.id, Math.floor(Math.random() * 20) + 5);
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter(msg => !msg.isRead && msg.senderId !== currentUser.id).length;

    return {
        id: user.id,
        user,
        messages,
        unreadCount,
        lastMessage,
        isPinned: index < 2,
    };
});

export const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } else if (diffInHours < 168) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
};

export const formatMessageTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};
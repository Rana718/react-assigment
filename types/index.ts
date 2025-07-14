interface User {
    id: string;
    name: string;
    profileImage: string;
    isOnline: boolean;
    lastSeen?: string;
}

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isRead: boolean;
    type: 'text' | 'image' | 'audio';
    isDeleted?: boolean;
}

interface Chat {
    id: string;
    user: User;
    messages: Message[];
    unreadCount: number;
    lastMessage: Message;
    isPinned: boolean;
}


export type {
    User,
    Message,
    Chat
}
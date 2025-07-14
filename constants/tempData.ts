export interface User {
  id: string;
  name: string;
  profileImage: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'audio';
  isDeleted?: boolean;
}

export interface Chat {
  id: string;
  user: User;
  messages: Message[];
  unreadCount: number;
  lastMessage: Message;
  isPinned: boolean;
}

export const currentUser: User = {
  id: 'current-user',
  name: 'You',
  profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  isOnline: true,
};

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
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
    isPinned: index < 2, // Pin first 2 chats
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
  } else if (diffInHours < 168) { // Less than a week
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
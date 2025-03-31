
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type Gender = "male" | "female" | "other";

export interface User {
  id: string;
  name: string;
  age: number;
  gender: Gender;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "emoji" | "photo" | "link";
  imageUrl?: string;
}

interface ChatContextType {
  currentUser: User | null;
  partner: User | null;
  messages: Message[];
  blockedUsers: string[];
  isSearching: boolean;
  login: (name: string, age: number, gender: Gender) => void;
  logout: () => void;
  sendMessage: (content: string, type: Message["type"], imageUrl?: string) => void;
  startSearch: () => void;
  stopSearch: () => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
  disconnectChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Generate a random partner
const generateRandomPartner = (currentUser: User): User => {
  const genders: Gender[] = ["male", "female", "other"];
  const names = [
    "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", 
    "Cameron", "Quinn", "Reese", "Blake", "Dakota", "Harper", "Emerson"
  ];

  return {
    id: generateId(),
    name: names[Math.floor(Math.random() * names.length)],
    age: Math.floor(Math.random() * 30) + 18, // Random age between 18-47
    gender: genders[Math.floor(Math.random() * genders.length)]
  };
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clean up the timeout when component unmounts
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [searchTimeout]);

  const login = (name: string, age: number, gender: Gender) => {
    const user: User = {
      id: generateId(),
      name,
      age,
      gender
    };
    setCurrentUser(user);
    toast.success(`Welcome, ${name}!`);
  };

  const logout = () => {
    disconnectChat();
    setCurrentUser(null);
    setBlockedUsers([]);
    toast.info("You have been logged out.");
  };

  const sendMessage = (content: string, type: Message["type"] = "text", imageUrl?: string) => {
    if (!currentUser || !partner) return;

    const newMessage: Message = {
      id: generateId(),
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type,
      imageUrl
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate partner response after a random delay
    if (Math.random() > 0.3) {  // 70% chance to respond
      const responseDelay = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds
      setTimeout(() => {
        const responses = [
          "That's interesting!",
          "Tell me more.",
          "I see what you mean.",
          "Haha, that's funny 😂",
          "I'm not sure I understand...",
          "Cool! 👍",
          "What else do you enjoy?",
          "I've never thought about it that way.",
          "Oh really?",
          "So what do you think about that?"
        ];
        const responseMessage: Message = {
          id: generateId(),
          senderId: partner.id,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          type: "text"
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, responseDelay);
    }
  };

  const startSearch = () => {
    if (currentUser) {
      setIsSearching(true);
      setMessages([]);
      
      // Simulate finding a partner after a random delay
      const timeout = setTimeout(() => {
        const newPartner = generateRandomPartner(currentUser);
        setPartner(newPartner);
        setIsSearching(false);
        toast.success(`Connected with ${newPartner.name}!`);
        
        // Add a welcome message from the partner
        const welcomeMessage: Message = {
          id: generateId(),
          senderId: newPartner.id,
          content: `Hi there! I'm ${newPartner.name}, ${newPartner.age} years old. How are you?`,
          timestamp: new Date(),
          type: "text"
        };
        setMessages([welcomeMessage]);
      }, Math.floor(Math.random() * 3000) + 1000); // 1-4 seconds
      
      setSearchTimeout(timeout);
    }
  };

  const stopSearch = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }
    setIsSearching(false);
    toast.info("Search cancelled.");
  };

  const blockUser = (userId: string) => {
    if (partner && partner.id === userId) {
      setBlockedUsers((prev) => [...prev, userId]);
      disconnectChat();
      toast.success("User has been blocked.");
    }
  };

  const unblockUser = (userId: string) => {
    setBlockedUsers((prev) => prev.filter((id) => id !== userId));
    toast.success("User has been unblocked.");
  };

  const isUserBlocked = (userId: string) => {
    return blockedUsers.includes(userId);
  };

  const disconnectChat = () => {
    if (partner) {
      setPartner(null);
      setMessages([]);
      toast.info("Chat disconnected.");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        partner,
        messages,
        blockedUsers,
        isSearching,
        login,
        logout,
        sendMessage,
        startSearch,
        stopSearch,
        blockUser,
        unblockUser,
        isUserBlocked,
        disconnectChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

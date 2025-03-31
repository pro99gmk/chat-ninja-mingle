
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useChat } from "@/context/ChatContext";
import MessageList from "./MessageList";
import { Smile, Send, Image, X, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define common emojis
const EMOJIS = [
  "😊", "😂", "❤️", "👍", "😍", "😒", "🙌", "👏", "😘", "🤔",
  "😭", "😎", "👋", "🎉", "🔥", "💯", "✨", "🙏", "👌", "😁",
  "👀", "💕", "🤷‍♂️", "🤷‍♀️", "🙄", "😅", "😩", "🤦‍♂️", "🤦‍♀️", "😤"
];

const ChatInterface = () => {
  const { currentUser, partner, sendMessage, blockUser, disconnectChat } = useChat();
  const [messageText, setMessageText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Check if the message is a Telegram link
      if (messageText.includes("t.me/")) {
        sendMessage(messageText, "link");
      } else {
        sendMessage(messageText, "text");
      }
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageText((prev) => prev + emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this file to a server or use a service
      // For this demo, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      sendMessage(file.name, "photo", imageUrl);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleBlockUser = () => {
    if (partner) {
      blockUser(partner.id);
    }
  };

  if (!partner) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-chat-background">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-chat-primary flex items-center justify-center text-white font-medium">
            {partner.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium">{partner.name}</h3>
            <p className="text-xs text-gray-500">
              {partner.age} • {partner.gender.charAt(0).toUpperCase() + partner.gender.slice(1)}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={disconnectChat}>
              Disconnect
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleBlockUser} className="text-destructive">
              Block User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Message input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          {/* Emoji picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 emoji-picker">
              <div className="grid grid-cols-6 gap-1">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    className="h-8 w-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Image upload */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-5 w-5" />
          </Button>

          {/* Text input */}
          <div className="flex-1 relative">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="pr-10"
            />
            {messageText && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setMessageText("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Send button */}
          <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

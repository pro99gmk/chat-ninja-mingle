
import { useEffect, useRef } from "react";
import { useChat, Message } from "@/context/ChatContext";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MessageItem = ({ message, isUser }: { message: Message; isUser: boolean }) => {
  const { currentUser, partner } = useChat();
  const user = isUser ? currentUser : partner;
  
  // Generate avatar fallback from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Format timestamp
  const formattedTime = format(new Date(message.timestamp), "h:mm a");

  // Handle message content based on type
  const renderMessageContent = () => {
    switch (message.type) {
      case "photo":
        return (
          <div className="mt-2 rounded-md overflow-hidden">
            <img
              src={message.imageUrl}
              alt="Shared"
              className="max-w-full max-h-[300px] rounded-md"
            />
          </div>
        );
      case "link":
        if (message.content.includes("t.me/")) {
          return (
            <a
              href={message.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {message.content}
            </a>
          );
        }
        return <span className="break-words">{message.content}</span>;
      default:
        return <span className="break-words">{message.content}</span>;
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-2 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn("h-8 w-8", getAvatarColor(user?.id || ""))}>
        <AvatarFallback>{user ? getInitials(user.name) : "??"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col max-w-[80%]">
        <div className="flex items-end gap-2">
          <div
            className={cn(
              "px-3 py-2 rounded-lg",
              isUser
                ? "bg-chat-primary text-white rounded-br-none"
                : "bg-white shadow rounded-bl-none"
            )}
          >
            {renderMessageContent()}
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

const MessageList = () => {
  const { messages, currentUser } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scroll">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500 text-center">
            No messages yet. Start the conversation!
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isUser={message.senderId === currentUser?.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;

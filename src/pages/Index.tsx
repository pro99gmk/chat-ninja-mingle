
import { useState } from "react";
import { useChat } from "@/context/ChatContext";
import LoginForm from "@/components/LoginForm";
import ChatInterface from "@/components/ChatInterface";
import ChatSearch from "@/components/ChatSearch";
import UserProfile from "@/components/UserProfile";
import TelegramInfo from "@/components/TelegramInfo";
import { Toaster } from "sonner";

const ChatPage = () => {
  const { currentUser, partner } = useChat();
  const [view, setView] = useState<"profile" | "search">("profile");

  // If user is not logged in, show login form
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <LoginForm />
        <TelegramInfo />
      </div>
    );
  }

  // If user is logged in and in a chat, show chat interface
  if (partner) {
    return (
      <div className="fixed inset-0 flex flex-col">
        <ChatInterface />
      </div>
    );
  }

  // If user is logged in but not in a chat, show profile or search
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background">
      {view === "profile" ? (
        <UserProfile onChat={() => setView("search")} />
      ) : (
        <ChatSearch />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      <ChatPage />
    </>
  );
};

export default Index;

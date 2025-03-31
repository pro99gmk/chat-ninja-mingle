
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useChat } from "@/context/ChatContext";
import BlockedUsers from "./BlockedUsers";
import { ExternalLink } from "lucide-react";

const UserProfile = ({ onChat }: { onChat: () => void }) => {
  const { currentUser, logout, blockedUsers, telegramBotUrl } = useChat();
  const [showBlocked, setShowBlocked] = useState(false);

  const openTelegramBot = () => {
    window.open(telegramBotUrl, '_blank');
  };

  if (showBlocked) {
    return <BlockedUsers onBack={() => setShowBlocked(false)} />;
  }

  if (!currentUser) return null;

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
        <CardDescription>Your anonymous chat identity</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h3 className="text-xl font-medium">{currentUser.name}</h3>
          <p className="text-sm text-muted-foreground">
            {currentUser.age} years old • {currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1)}
          </p>
        </div>

        <Button 
          variant="outline" 
          onClick={openTelegramBot} 
          className="w-full flex items-center justify-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Open in Telegram
        </Button>

        <Separator />

        <div className="space-y-4">
          <Button 
            onClick={onChat} 
            className="w-full"
          >
            Find Random Chat Partner
          </Button>

          <Button 
            variant="outline" 
            onClick={() => setShowBlocked(true)} 
            className="w-full"
            disabled={blockedUsers.length === 0}
          >
            Blocked Users ({blockedUsers.length})
          </Button>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" onClick={logout} className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;

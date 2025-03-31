
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/context/ChatContext";
import { LogOut, User, Shield } from "lucide-react";
import BlockedUsers from "./BlockedUsers";

const UserProfile = ({ onChat }: { onChat: () => void }) => {
  const { currentUser, logout } = useChat();
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);

  if (showBlockedUsers) {
    return <BlockedUsers onBack={() => setShowBlockedUsers(false)} />;
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        <CardDescription className="text-center">
          Your anonymous chat profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-chat-primary flex items-center justify-center">
          <User className="h-10 w-10 text-white" />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-center">Name</p>
            <p className="text-center font-semibold">{currentUser?.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-center">Age</p>
              <p className="text-center font-semibold">{currentUser?.age}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-center">Gender</p>
              <p className="text-center font-semibold capitalize">{currentUser?.gender}</p>
            </div>
          </div>
          
          <div className="pt-4 space-y-2">
            <Button 
              className="w-full" 
              variant="default"
              onClick={onChat}
            >
              Find Chat Partner
            </Button>
            
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => setShowBlockedUsers(true)}
            >
              <Shield className="mr-2 h-4 w-4" />
              Blocked Users
            </Button>
            
            <Button 
              className="w-full" 
              variant="outline"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;

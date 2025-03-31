
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/context/ChatContext";
import { ArrowLeft } from "lucide-react";

const BlockedUsers = ({ onBack }: { onBack: () => void }) => {
  const { blockedUsers, unblockUser } = useChat();

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="ml-2">Blocked Users</CardTitle>
        </div>
        <CardDescription>
          {blockedUsers.length === 0
            ? "You haven't blocked any users yet."
            : "You have blocked the following users:"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {blockedUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No blocked users</p>
          </div>
        ) : (
          <div className="space-y-2">
            {blockedUsers.map((userId) => (
              <div key={userId} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span>User {userId}</span>
                <Button variant="outline" size="sm" onClick={() => unblockUser(userId)}>
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockedUsers;

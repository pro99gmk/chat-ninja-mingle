
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/context/ChatContext";

const ChatSearch = () => {
  const { startSearch, stopSearch, isSearching } = useChat();

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Find a Chat Partner</CardTitle>
          <CardDescription className="text-center">
            Click the button below to find someone to chat with
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="text-center">
            {isSearching ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-chat-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-muted-foreground">Searching for a chat partner...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 rounded-full bg-chat-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-chat-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground">Ready to meet someone new?</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {isSearching ? (
            <Button
              variant="outline"
              onClick={stopSearch}
              className="w-full"
            >
              Cancel Search
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={startSearch}
            >
              Start Random Chat
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatSearch;

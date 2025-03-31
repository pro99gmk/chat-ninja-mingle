
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChat } from "@/context/ChatContext";
import { ExternalLink } from "lucide-react";

const TelegramInfo = () => {
  const { telegramBotUrl } = useChat();

  return (
    <Card className="w-full max-w-md shadow-lg mt-4">
      <CardHeader>
        <CardTitle>Connect with Telegram</CardTitle>
        <CardDescription>
          You can also use this chat on Telegram
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Our chat service is also available on Telegram. Connect with random people worldwide
          using our Telegram bot.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex items-center gap-2"
          onClick={() => window.open(telegramBotUrl, '_blank')}
        >
          <ExternalLink size={16} />
          Open Chat in Telegram
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TelegramInfo;

"use client";

import { useState } from "react";
import { 
  Bot, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  User,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: string;
  botName: string;
  userName: string;
  date: string;
  preview: string;
  rating?: "positive" | "negative";
  messageCount: number;
  flagged: boolean;
  status: "completed" | "abandoned" | "ongoing";
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    botName: "Customer Support Bot",
    userName: "john.doe@example.com",
    date: "Today, 10:45 AM",
    preview: "I'm having trouble resetting my password...",
    rating: "positive",
    messageCount: 14,
    flagged: false,
    status: "completed",
  },
  {
    id: "2",
    botName: "Sales Assistant",
    userName: "sarah.smith@example.com",
    date: "Today, 9:20 AM",
    preview: "Do you have any discounts for bulk orders?",
    rating: "positive",
    messageCount: 8,
    flagged: false,
    status: "completed",
  },
  {
    id: "3",
    botName: "Customer Support Bot",
    userName: "mike.johnson@example.com",
    date: "Yesterday, 3:15 PM",
    preview: "Your bot didn't understand my question about refunds...",
    rating: "negative",
    messageCount: 6,
    flagged: true,
    status: "abandoned",
  },
  {
    id: "4",
    botName: "Product FAQ",
    userName: "emily.williams@example.com",
    date: "Yesterday, 1:30 PM",
    preview: "How long does shipping usually take?",
    messageCount: 5,
    flagged: false,
    status: "completed",
  },
  {
    id: "5",
    botName: "Sales Assistant",
    userName: "robert.brown@example.com",
    date: "Mar 25, 2024",
    preview: "I'm looking for information on enterprise pricing...",
    messageCount: 12,
    flagged: false,
    status: "completed",
  },
  {
    id: "6",
    botName: "Product FAQ",
    userName: "jennifer.davis@example.com",
    date: "Mar 24, 2024",
    preview: "The product specifications on your website are incorrect...",
    rating: "negative",
    messageCount: 9,
    flagged: true,
    status: "completed",
  },
  {
    id: "7",
    botName: "Customer Support Bot",
    userName: "david.miller@example.com",
    date: "Mar 23, 2024",
    preview: "I need to cancel my subscription...",
    messageCount: 7,
    flagged: false,
    status: "ongoing",
  },
];

export function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredConversations = searchTerm.trim() === ""
    ? conversations
    : conversations.filter(convo => 
        convo.botName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.preview.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {filteredConversations.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                No conversations found matching your search
              </p>
            </div>
          ) : (
            filteredConversations.map((convo) => (
              <div
                key={convo.id}
                className="flex flex-col rounded-lg border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarFallback className="bg-primary/10">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-medium">{convo.userName}</div>
                        <Badge variant="outline" className="text-xs">
                          {convo.botName}
                        </Badge>
                        {convo.flagged && (
                          <Badge variant="outline" className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 text-xs">
                            <Flag className="mr-1 h-3 w-3" />
                            Flagged
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {convo.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {convo.preview}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{convo.date}</span>
                        <span>•</span>
                        <span>{convo.messageCount} messages</span>
                        {convo.rating && (
                          <>
                            <span>•</span>
                            <span className="flex items-center">
                              {convo.rating === "positive" ? (
                                <ThumbsUp className="mr-1 h-3 w-3 text-green-500" />
                              ) : (
                                <ThumbsDown className="mr-1 h-3 w-3 text-red-500" />
                              )}
                              {convo.rating === "positive" ? "Positive" : "Negative"} feedback
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
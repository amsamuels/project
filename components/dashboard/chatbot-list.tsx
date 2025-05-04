"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  Edit, 
  MoreVertical, 
  Trash, 
  PlusCircle,
  Zap,
  Info,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Chatbot {
  id: string;
  name: string;
  status: "active" | "inactive" | "draft";
  type: "customer-support" | "sales" | "faq" | "custom";
  messages: number;
  created: string;
  lastActive: string;
  trainingProgress?: number;
}

const mockChatbots: Chatbot[] = [
  {
    id: "1",
    name: "Customer Support Bot",
    status: "active",
    type: "customer-support",
    messages: 1245,
    created: "2023-10-15",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sales Assistant",
    status: "active",
    type: "sales",
    messages: 853,
    created: "2023-11-20",
    lastActive: "5 minutes ago",
  },
  {
    id: "3",
    name: "Product FAQ",
    status: "inactive",
    type: "faq",
    messages: 421,
    created: "2023-09-05",
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "New Training Bot",
    status: "draft",
    type: "custom",
    messages: 0,
    created: "2024-04-01",
    lastActive: "Never",
    trainingProgress: 65,
  },
];

export function ChatbotList() {
  const [chatbots, setChatbots] = useState<Chatbot[]>(mockChatbots);

  const getStatusColor = (status: Chatbot["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "inactive":
        return "bg-yellow-500 text-white";
      case "draft":
        return "bg-blue-500 text-white";
    }
  };

  const getTypeIcon = (type: Chatbot["type"]) => {
    switch (type) {
      case "customer-support":
        return <Info className="h-3 w-3" />;
      case "sales":
        return <Zap className="h-3 w-3" />;
      case "faq":
        return <Info className="h-3 w-3" />;
      case "custom":
        return <Bot className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {chatbots.length} chatbots
        </div>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chatbot
        </Button>
      </div>
      
      <div className="grid gap-4">
        {chatbots.map((bot) => (
          <div
            key={bot.id}
            className="flex flex-col md:flex-row justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40"
          >
            <div className="flex items-start gap-4">
              <Avatar className="mt-1 h-10 w-10 border">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="font-medium">{bot.name}</div>
                  <Badge variant="outline" className={`${getStatusColor(bot.status)} whitespace-nowrap text-xs`}>
                    {bot.status}
                  </Badge>
                  <Badge variant="outline" className="whitespace-nowrap text-xs flex items-center gap-1">
                    {getTypeIcon(bot.type)}
                    {bot.type.split("-").map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(" ")}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {bot.messages} messages
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Created {bot.created}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Active {bot.lastActive}
                  </span>
                </div>
                {bot.trainingProgress !== undefined && (
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex justify-between text-xs">
                      <span>Training in progress</span>
                      <span>{bot.trainingProgress}%</span>
                    </div>
                    <Progress value={bot.trainingProgress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto mt-2 md:mt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share chatbot</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit chatbot</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Analytics</DropdownMenuItem>
                  <DropdownMenuItem>Training data</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
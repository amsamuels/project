"use client";

import { useEffect, useState } from "react";
import { Bot, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  type: "message" | "user" | "bot";
  title: string;
  description: string;
  time: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "message",
    title: "New conversation",
    description: "Customer Support Bot received 5 new messages",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "user",
    title: "New user signup",
    description: "john.doe@example.com created an account",
    time: "10 minutes ago",
  },
  {
    id: "3",
    type: "bot",
    title: "Bot deployed",
    description: "Sales Assistant v2 has been deployed",
    time: "25 minutes ago",
  },
  {
    id: "4",
    type: "message",
    title: "Conversation completed",
    description: "FAQ Assistant completed 12 conversations",
    time: "45 minutes ago",
  },
  {
    id: "5",
    type: "bot",
    title: "Bot updated",
    description: "Product Recommender model was updated",
    time: "1 hour ago",
  },
  {
    id: "6",
    type: "user",
    title: "User feedback",
    description: "sarah.smith@example.com left a 5-star rating",
    time: "2 hours ago",
  },
];

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setActivities(mockActivities);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      case "bot":
        return <Bot className="h-4 w-4" />;
    }
  };

  const getInitials = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return "MS";
      case "user":
        return "US";
      case "bot":
        return "BT";
    }
  };

  const getAvatarColor = (type: Activity["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300";
      case "user":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300";
      case "bot":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    }
  };

  return (
    <ScrollArea className="h-[350px] pr-4">
      {activities.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading recent activity...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg transition-colors hover:bg-muted/40 p-2">
              <Avatar className={`mt-1 h-8 w-8 ${getAvatarColor(activity.type)}`}>
                <AvatarFallback className="text-xs">
                  {getInitials(activity.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <div className="flex h-5 items-center gap-1 rounded-full bg-muted px-2">
                    {getIcon(activity.type)}
                    <span className="text-xs">{activity.type}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
"use client";

import { 
  Users, 
  MessagesSquare, 
  Bot, 
  ArrowUpRight,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            {trend.positive ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowUpRight className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span className={trend.positive ? "text-green-500" : "text-red-500"}>
              {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Users"
        value="12,345"
        description="Active users across all chatbots"
        icon={Users}
        trend={{ value: "+12.3%", positive: true }}
      />
      <StatsCard
        title="Conversations"
        value="48,293"
        description="Total conversations this month"
        icon={MessagesSquare}
        trend={{ value: "+8.2%", positive: true }}
      />
      <StatsCard
        title="Active Bots"
        value="7"
        description="Chatbots currently active"
        icon={Bot}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Bot className="mr-2 h-4 w-4" />
            Create new bot
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="mr-2 h-4 w-4" />
            View analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
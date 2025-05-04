"use client";

import { useEffect, useState } from "react";
import { BarChart, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    positive: boolean;
  };
  color: string;
}

const Metric = ({ title, value, description, icon: Icon, trend, color }: MetricProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <span
                className={`text-xs ${
                  trend.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.positive ? "+" : "-"}{trend.value}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export function ConversationMetrics() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoaded) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Metric
        title="Total Conversations"
        value="1,234"
        description="Across all chatbots this month"
        icon={BarChart}
        trend={{ value: "12%", positive: true }}
        color="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      />
      <Metric
        title="Completed"
        value="986"
        description="Conversations with successful outcomes"
        icon={CheckCircle}
        trend={{ value: "8%", positive: true }}
        color="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
      />
      <Metric
        title="Abandoned"
        value="187"
        description="Users left without resolution"
        icon={Clock}
        trend={{ value: "3%", positive: false }}
        color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
      />
      <Metric
        title="Flagged"
        value="61"
        description="Conversations that need attention"
        icon={AlertTriangle}
        color="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
      />
    </div>
  );
}
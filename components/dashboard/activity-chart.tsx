"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";
import { useTheme } from "next-themes";

interface DataPoint {
  date: string;
  messages: number;
  users: number;
}

function generateMockData(): DataPoint[] {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    // Create more interesting patterns for the data
    const dayOfWeek = date.getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
    
    // Base value plus random noise
    const baseMessages = Math.floor(100 + i * 2.5);
    const messageNoise = Math.floor(Math.random() * 40 - 20);
    
    const baseUsers = Math.floor(20 + i * 0.8);
    const userNoise = Math.floor(Math.random() * 15 - 7);
    
    data.push({
      date: format(date, "MMM dd"),
      messages: Math.max(0, Math.floor((baseMessages + messageNoise) * weekendFactor)),
      users: Math.max(0, Math.floor((baseUsers + userNoise) * weekendFactor)),
    });
  }
  
  return data;
}

export function ActivityChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData(generateMockData());
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  const isDark = theme === "dark";
  
  const lineColors = {
    messages: isDark ? "hsl(var(--chart-1))" : "hsl(var(--chart-1))",
    users: isDark ? "hsl(var(--chart-2))" : "hsl(var(--chart-2))",
  };
  
  if (data.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColors.messages} stopOpacity={0.3} />
              <stop offset="95%" stopColor={lineColors.messages} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColors.users} stopOpacity={0.3} />
              <stop offset="95%" stopColor={lineColors.users} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "hsl(var(--muted))" : "hsl(var(--muted))"}
            opacity={0.4}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: isDark ? "hsl(var(--muted))" : "hsl(var(--muted))" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
          />
          <Area
            type="monotone"
            dataKey="messages"
            name="Messages"
            stroke={lineColors.messages}
            fillOpacity={1}
            fill="url(#colorMessages)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="users"
            name="Active Users"
            stroke={lineColors.users}
            fillOpacity={1}
            fill="url(#colorUsers)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
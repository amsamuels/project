"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";
import { useTheme } from "next-themes";

interface DataPoint {
  date: string;
  conversations: number;
  messages: number;
  completionRate: number;
}

function generateMockData(): DataPoint[] {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(now, i);
    const dayOfWeek = date.getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
    
    // Base values with some randomness
    const baseConversations = Math.floor(50 + i * 1.5);
    const convNoise = Math.floor(Math.random() * 20 - 10);
    
    const baseMessages = Math.floor((baseConversations + convNoise) * 4.5);
    const msgNoise = Math.floor(Math.random() * 50 - 25);
    
    // Completion rate between 75% and 95% with some variation
    const baseCompletionRate = 75 + Math.floor(Math.random() * 20);
    
    data.push({
      date: format(date, "MMM dd"),
      conversations: Math.max(0, Math.floor((baseConversations + convNoise) * weekendFactor)),
      messages: Math.max(0, Math.floor((baseMessages + msgNoise) * weekendFactor)),
      completionRate: baseCompletionRate,
    });
  }
  
  return data;
}

export function OverviewChart() {
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
  
  if (data.length === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }
  
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
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
            yAxisId="left"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="conversations"
            name="Conversations"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="messages"
            name="Messages"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="completionRate"
            name="Completion Rate"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
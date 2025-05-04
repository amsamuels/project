"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";

interface BotData {
  name: string;
  responseRate: number;
  satisfactionScore: number;
}

const mockData: BotData[] = [
  {
    name: "Customer Support",
    responseRate: 92,
    satisfactionScore: 88,
  },
  {
    name: "Sales Assistant",
    responseRate: 87,
    satisfactionScore: 82,
  },
  {
    name: "Product FAQ",
    responseRate: 95,
    satisfactionScore: 91,
  },
  {
    name: "Website Helper",
    responseRate: 89,
    satisfactionScore: 85,
  },
];

export function BotPerformance() {
  const [data, setData] = useState<BotData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  const isDark = theme === "dark";
  
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
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
          barSize={20}
          onMouseMove={(data) => {
            if (data.activeTooltipIndex !== undefined) {
              setActiveIndex(data.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: isDark ? "hsl(var(--muted))" : "hsl(var(--muted))" }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
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
            formatter={(value: number) => [`${value}%`]}
          />
          <Bar
            dataKey="responseRate"
            name="Response Rate"
            radius={[4, 4, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeIndex === index
                    ? "hsl(var(--chart-1))"
                    : isDark
                    ? "hsla(var(--chart-1), 0.7)"
                    : "hsla(var(--chart-1), 0.7)"
                }
              />
            ))}
          </Bar>
          <Bar
            dataKey="satisfactionScore"
            name="Satisfaction Score"
            radius={[4, 4, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeIndex === index
                    ? "hsl(var(--chart-2))"
                    : isDark
                    ? "hsla(var(--chart-2), 0.7)"
                    : "hsla(var(--chart-2), 0.7)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
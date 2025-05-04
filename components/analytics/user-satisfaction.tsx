"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";

interface SatisfactionData {
  name: string;
  value: number;
}

const mockData: SatisfactionData[] = [
  { name: "Very Satisfied", value: 42 },
  { name: "Satisfied", value: 28 },
  { name: "Neutral", value: 18 },
  { name: "Unsatisfied", value: 8 },
  { name: "Very Unsatisfied", value: 4 },
];

export function UserSatisfaction() {
  const [data, setData] = useState<SatisfactionData[]>([]);
  const { theme } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const isDark = theme === "dark";
  
  const COLORS = isDark
    ? [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ]
    : [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ];
  
  if (data.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }
  
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Percentage"]}
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
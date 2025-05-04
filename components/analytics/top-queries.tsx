"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface QueryItem {
  query: string;
  count: number;
  percentage: number;
}

const mockQueries: QueryItem[] = [
  {
    query: "How do I reset my password?",
    count: 245,
    percentage: 18,
  },
  {
    query: "What are your pricing plans?",
    count: 189,
    percentage: 14,
  },
  {
    query: "How long does shipping take?",
    count: 156,
    percentage: 12,
  },
  {
    query: "Do you offer refunds?",
    count: 143,
    percentage: 11,
  },
  {
    query: "How to contact customer support?",
    count: 124,
    percentage: 9,
  },
  {
    query: "Where is my order?",
    count: 102,
    percentage: 8,
  },
  {
    query: "Product specifications",
    count: 87,
    percentage: 7,
  },
];

export function TopQueries() {
  const [queries, setQueries] = useState<QueryItem[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueries(mockQueries);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (queries.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading query data...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {queries.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{item.query}</span>
            <span className="text-muted-foreground">{item.count}</span>
          </div>
          <Progress value={item.percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">{item.percentage}% of all queries</p>
        </div>
      ))}
    </div>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewChart } from "@/components/analytics/overview-chart";
import { BotPerformance } from "@/components/analytics/bot-performance";
import { UserSatisfaction } from "@/components/analytics/user-satisfaction";
import { TopQueries } from "@/components/analytics/top-queries";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Monitor and analyze your chatbot performance
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>
                  View key metrics for all your chatbots
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bot Performance</CardTitle>
                <CardDescription>
                  Compare effectiveness across chatbots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BotPerformance />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Satisfaction</CardTitle>
                <CardDescription>
                  Based on feedback and conversation completions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserSatisfaction />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Queries</CardTitle>
                <CardDescription>
                  Most common user questions and topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopQueries />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>
                Detailed usage statistics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Usage analytics content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Detailed performance data and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Performance metrics content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>
                Understand your user base and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">User analytics content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
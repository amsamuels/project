import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DashboardStats,
  RecentActivity,
  ChatbotList,
  ActivityChart
} from "@/components/dashboard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <DashboardStats />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Conversations Activity</CardTitle>
                <CardDescription>
                  Your conversation activity over the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ActivityChart />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your most recent chatbot interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed metrics about your chatbots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Analytics dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chatbots" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Your Chatbots</CardTitle>
                <CardDescription>
                  Manage and monitor your chatbots
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ChatbotList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
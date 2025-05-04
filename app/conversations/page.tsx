import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationList } from "@/components/conversations/conversation-list";
import { ConversationMetrics } from "@/components/conversations/conversation-metrics";

export default function ConversationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">
          View and analyze conversations across all your chatbots
        </p>
      </div>
      
      <ConversationMetrics />
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Conversations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="abandoned">Abandoned</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>
                    Browse and search through all conversations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConversationList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  Completed conversations will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="abandoned">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  Abandoned conversations will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flagged">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  Flagged conversations will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
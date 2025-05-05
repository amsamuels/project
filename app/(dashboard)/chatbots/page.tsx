import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatbotList } from "@/components/dashboard/chatbot-list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChatbotsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbots</h1>
          <p className="text-muted-foreground">
            Create and manage your AI chatbots
          </p>
        </div>
        <Link href="/chatbots/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Chatbot
          </Button>
        </Link>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Chatbots</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <ChatbotList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  Active chatbots will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  Inactive chatbots will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts">
          <Card>
            <CardContent className="pt-6">
              <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-sm text-muted-foreground">
                  Draft chatbots will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Learn how to create effective chatbots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium">1. Define your bot's purpose</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Decide what problem your chatbot will solve for users
                </p>
              </div>
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium">2. Gather training data</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload documents or examples of conversations
                </p>
              </div>
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium">3. Test and refine</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Continuously improve your chatbot's responses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Bot Templates</CardTitle>
            <CardDescription>Start with pre-configured templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Customer Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Lead Generation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Product FAQ
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Website Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>What's new in the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-medium">New embedding model</h3>
                <p className="text-sm text-muted-foreground">
                  Improved context understanding for better responses
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-medium">Enhanced analytics</h3>
                <p className="text-sm text-muted-foreground">
                  More detailed insights into chatbot performance
                </p>
                <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
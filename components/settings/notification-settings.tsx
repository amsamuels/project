"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export function NotificationSettings() {
  const handleSave = () => {
    toast.success("Notification settings saved successfully");
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure the emails you want to receive
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="chatbot-activity">Chatbot activity</Label>
              <p className="text-xs text-muted-foreground">
                Receive updates about your chatbot performance and activity
              </p>
            </div>
            <Switch id="chatbot-activity" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="conversation-alerts">Conversation alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified when conversations are flagged or need attention
              </p>
            </div>
            <Switch id="conversation-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="account-updates">Account updates</Label>
              <p className="text-xs text-muted-foreground">
                Receive important updates about your account and billing
              </p>
            </div>
            <Switch id="account-updates" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing emails</Label>
              <p className="text-xs text-muted-foreground">
                Receive news, promotions, and tips for using the platform
              </p>
            </div>
            <Switch id="marketing-emails" />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">In-app Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure notifications you see within the dashboard
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="real-time-alerts">Real-time alerts</Label>
              <p className="text-xs text-muted-foreground">
                Show notifications in real-time for important events
              </p>
            </div>
            <Switch id="real-time-alerts" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Notification frequency</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">
                  All notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="important" />
                <Label htmlFor="important" className="font-normal">
                  Important only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="font-normal">
                  None
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave}>Save Notification Settings</Button>
    </div>
  );
}
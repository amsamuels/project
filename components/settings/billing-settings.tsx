"use client";

import { useState } from "react";
import { Check, CreditCard, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface PlanProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

const Plan = ({ name, description, price, features, isPopular, isCurrent }: PlanProps) => (
  <Card className={`relative ${isPopular ? "border-primary shadow-md" : ""}`}>
    {isPopular && (
      <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
        Popular
      </div>
    )}
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-2">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-muted-foreground">/month</span>}
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        className="w-full" 
        variant={isCurrent ? "outline" : isPopular ? "default" : "outline"}
        disabled={isCurrent}
      >
        {isCurrent ? "Current Plan" : "Upgrade"}
      </Button>
    </CardFooter>
  </Card>
);

export function BillingSettings() {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleUpdatePayment = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Payment method updated successfully");
    }, 1000);
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Current Plan</h3>
          <p className="text-sm text-muted-foreground">
            You are currently on the <strong>Professional</strong> plan
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Plan
            name="Starter"
            description="For individuals and small projects"
            price="Free"
            features={[
              "1 chatbot",
              "1,000 messages per month",
              "Basic analytics",
              "Community support",
            ]}
          />
          
          <Plan
            name="Professional"
            description="For growing businesses"
            price="$49"
            features={[
              "5 chatbots",
              "10,000 messages per month",
              "Advanced analytics",
              "Priority support",
              "API access",
            ]}
            isPopular
            isCurrent
          />
          
          <Plan
            name="Enterprise"
            description="For large organizations"
            price="$199"
            features={[
              "Unlimited chatbots",
              "100,000 messages per month",
              "Custom analytics",
              "Dedicated support",
              "Advanced API features",
              "Custom integrations",
            ]}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Payment Method</h3>
          <p className="text-sm text-muted-foreground">
            Manage your payment information and billing history
          </p>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-muted p-2">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={handleUpdatePayment} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Payment Method"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Professional Plan - Monthly</p>
                  <p className="text-sm text-muted-foreground">April 1, 2024</p>
                </div>
                <p className="font-medium">$49.00</p>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Professional Plan - Monthly</p>
                  <p className="text-sm text-muted-foreground">March 1, 2024</p>
                </div>
                <p className="font-medium">$49.00</p>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Professional Plan - Monthly</p>
                  <p className="text-sm text-muted-foreground">February 1, 2024</p>
                </div>
                <p className="font-medium">$49.00</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm" className="px-0">
                View all invoices
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
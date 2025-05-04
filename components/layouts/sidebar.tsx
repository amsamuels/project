"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bot, BarChart2, MessageSquare, Settings, Home, 
  Menu, X, LogOut, LayoutDashboard, Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Chatbots",
      icon: Bot,
      href: "/chatbots",
      active: pathname === "/chatbots" || pathname.startsWith("/chatbots/"),
    },
    {
      label: "Conversations",
      icon: MessageSquare,
      href: "/conversations",
      active: pathname === "/conversations",
    },
    {
      label: "Analytics",
      icon: BarChart2,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Integrations",
      icon: Code,
      href: "/integrations",
      active: pathname === "/integrations",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  const MobileMenu = (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-64">
        <div className="space-y-4 py-4 h-full flex flex-col">
          <div className="px-4 py-2 flex items-center justify-between border-b">
            <h2 className="text-lg font-semibold">AI Chat Dashboard</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => onOpenChange(false)}
                >
                  <Button
                    variant={route.active ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", {
                      "bg-secondary": route.active,
                    })}
                  >
                    <route.icon className="mr-2 h-5 w-5" />
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t px-4 py-2">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {MobileMenu}
      <div className="hidden border-r bg-card md:flex md:w-64 md:flex-col h-screen sticky top-0">
        <div className="flex flex-col h-full">
          <div className="flex h-14 items-center border-b px-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold"
            >
              <Bot className="h-6 w-6" />
              <span className="text-lg">AI Chat Dashboard</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                >
                  <Button
                    variant={route.active ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", {
                      "bg-secondary": route.active,
                    })}
                  >
                    <route.icon className="mr-2 h-5 w-5" />
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
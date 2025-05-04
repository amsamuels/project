"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layouts/sidebar";
import { TopNav } from "@/components/layouts/top-nav";
import { useUser } from "@auth0/nextjs-auth0/client";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Only show the sidebar and top nav on dashboard pages, not on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <TopNav onSidebarOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
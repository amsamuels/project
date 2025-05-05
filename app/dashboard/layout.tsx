'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layouts/sidebar';
import { TopNav } from '@/components/layouts/top-nav';
import { useCurrentUser } from '@/hooks/useCurrentUser'; // <- Your Zustand-based hook

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <div className="p-6">Loading dashboard...</div>;
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

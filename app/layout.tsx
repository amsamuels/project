import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { UserProvider } from "@auth0/nextjs-auth0/client"; 


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Chat Dashboard',
  description: 'Manage and analyze your AI chatbots',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster />
        </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
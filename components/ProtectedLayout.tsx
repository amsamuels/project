// /components/ProtectedLayout.tsx
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedLayout({ 
  children,
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole: string;
}) {
  const { backendUser } = useCurrentUser();
  const router = useRouter();
  
  useEffect(() => {
    if (backendUser && backendUser.role !== requiredRole) {
      router.push('/pricing');
    }
  }, [backendUser, requiredRole, router]);
  
  if (!backendUser || backendUser.role !== requiredRole) {
    return <div>Loading...</div>;
  }
  
  return <>{children}</>;
}
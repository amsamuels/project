// /lib/withRoleProtection.ts
import { useUserStore } from '@/store/user';
import { GetServerSideProps } from 'next';

export const withRoleProtection = (requiredRole: string) => (
  getServerSideProps: GetServerSideProps
) => async (context: any) => {
  // Get user from store
  const { backendUser } = useUserStore.getState();
  
  // If user not loaded, redirect to login
  if (!backendUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // Check role
  if (backendUser.role !== requiredRole) {
    return {
      redirect: {
        destination: '/pricing', // or '/unauthorized'
        permanent: false,
      },
    };
  }

  return getServerSideProps ? await getServerSideProps(context) : { props: {} };
};
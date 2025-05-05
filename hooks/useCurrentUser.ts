import { useEffect } from 'react';
import { useUserStore } from '@/store/user';

export const useCurrentUser = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) return;

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };

    if (!user) fetchUser();
  }, [user, setUser]);

  return { user };
};

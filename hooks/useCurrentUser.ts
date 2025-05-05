import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserStore } from "@/store/user";

export const useCurrentUser = () => {
  const { user, isLoading: auth0Loading } = useUser();
  const { backendUser, setBackendUser } = useUserStore();

  useEffect(() => {
    if (!user || backendUser) return;

    const fetchBackendUser = async () => {
      try {
        const res = await fetch("/api/user"); 
        if (!res.ok) throw new Error("failed to fetch backend user");
        const data = await res.json();
        setBackendUser(data);
      } catch (err) {
        console.error("failed to load backend user:", err);
      }
    };

    fetchBackendUser();
  }, [user, auth0Loading, backendUser]);

  return { user, backendUser, loading: auth0Loading };
};

"use client";
import { useAuthContext } from "@/providers/AuthProvider";
import { isInitialized } from "@sentry/nextjs";

export const useAuth = () => {
  const { user, isAuthenticated, loading } = useAuthContext();
  return {
    user,
    isAuthenticated,
    loading,
    isInitialized,
  };
};
// readonly state

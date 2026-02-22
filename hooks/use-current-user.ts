"use client";

import { useSession } from "@/lib/auth-client";

export function useCurrentUser() {
  const {
    data: session,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useSession();
  return {
    user: session?.user ?? null,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}

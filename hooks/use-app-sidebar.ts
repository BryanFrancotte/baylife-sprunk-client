"use client"

import { ApiError } from "@/lib/api/baseApi";
import { fetchMe } from "@/lib/api/user";
import { User } from "@/lib/types/user";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseAppSidebarReturn {
  user: User | null
}

export function useAppSidebar(): UseAppSidebarReturn {
  const [user, setUser] = useState<User | null>(null)

  const loadUser = useCallback(
    async() => {
      try {
        const user = await fetchMe();
        setUser(user);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch user data";

          if(err instanceof ApiError) {
            toast.error(`${err.name}: (${err.type}) ${errorMessage}`, {
              description: `${err.summary}`
            })
          } else {
            toast.error(errorMessage)
          }
          throw new Error(errorMessage);
      } finally {
        //TODO: check what can I do here...
      } 
    },
  []);

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return { user }
}
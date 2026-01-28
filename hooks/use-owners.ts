"use client"

import { ApiError } from "@/lib/api/baseApi";
import { fetchOwners, updateOwner } from "@/lib/api/dispensers";
import { CreateOwnerPayload, Owner } from "@/lib/types/dispensers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseOwnerReturn {
  owners: Owner[];
  isLoading: boolean;
  error: string | null;
  updateEditedOwner: (id: string, data: CreateOwnerPayload) => Promise<void>;
  refreshData: () => Promise<void>;
}

export function useOwners(): UseOwnerReturn {

  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(
    async() => {
      try {
        setIsLoading(true)
        setError(null)
        const ownerData = await fetchOwners();
        setOwners(ownerData);
      } catch (err) {
        const errorMessage = 
          err instanceof Error? err.message : "Failed to update owner"

        if(err instanceof ApiError) {
          toast.error(`${err.name}: (${err.type}) ${errorMessage}`, {
            description: `${err.summary}`
          });
        } else {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false)
      }
    },
  []);

  const updateEditedOwner = useCallback(
    async(id: string, data: CreateOwnerPayload) => {
      try {
        const updatedOwner = await updateOwner(id, data);
        setOwners((prev) =>
          prev.map(d => d.id === updatedOwner.id? updatedOwner : d) 
        );
      } catch (err) {
        const errorMessage = 
          err instanceof Error? err.message : "Failed to update owner"

        if(err instanceof ApiError) {
          toast.error(`${err.name}: (${err.type}) ${errorMessage}`, {
            description: `${err.summary}`
          });
        } else {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      }
    },
  [])

  const refreshData = useCallback(
    async() => {
      await loadData();
    }, 
  [loadData])

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    owners,
    isLoading,
    error,
    updateEditedOwner,
    refreshData
  }
}
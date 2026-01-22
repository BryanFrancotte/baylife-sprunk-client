"use client";

import {
  ApiError,
  collectDispenser,
  createDispenser,
  deleteDispenser,
  fetchDispensers,
  fetchOwners,
  updateDispenser,
} from "@/lib/api/dispensers";
import {
  CollectDispenserPayload,
  CreateDispenserPayload,
  Dispenser,
  Owner,
} from "@/lib/types/dispensers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Hook return type
interface UseDispensersReturn {
  dispensers: Dispenser[];
  owners: Owner[];
  isLoading: boolean;
  error: string | null;
  createNewDispenser: (data: CreateDispenserPayload) => Promise<void>;
  updateEditedDispenser: (id: string, data: Partial<CreateDispenserPayload>) => Promise<void>;
  collectMoneyFromDispenser: (id: string, data: CollectDispenserPayload) => Promise<void>,
  removeDispenser: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export function useDispensers(): UseDispensersReturn {
  const [dispensers, setDispensers] = useState<Dispenser[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch both dispensers and owners in parallel
      const [dispenserData, ownerData] = await Promise.all([
        fetchDispensers(),
        fetchOwners(),
      ]);

      setDispensers(dispenserData);
      setOwners(ownerData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load data!";
      setError(errorMessage);
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new dispenser
  const createNewDispenser = useCallback(
    async (data: CreateDispenserPayload) => {
      try {
        const newDispenser = await createDispenser(data);
        setDispensers((prev) => [...prev, newDispenser]);
        if (data.ownerId === "") {
          const newOwner = newDispenser.owner;
          setOwners((prev) => [...prev, newOwner]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create dispenser!";

        if (err instanceof ApiError) {
          toast.error(`${err.name}: (${err.type}) ${errorMessage}`, {
            description: `${err.summary}`
          })
        } else {
          toast.error(errorMessage)
        }
        throw new Error(errorMessage);
      }
    },
    []
  );

  const updateEditedDispenser = useCallback(async (id: string, data: Partial<CreateDispenserPayload>) => {
      try {
        const updatedDispenser = await updateDispenser(id, data);
        setDispensers((prev) => 
          prev.map(d => d.id === updatedDispenser.id ? updatedDispenser : d)
        );
      }  catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update dispenser!";

        if (err instanceof ApiError) {
          toast.error(`${err.name}: (${err.type}) ${errorMessage}`, {
            description: `${err.summary}`
          })
        } else {
          toast.error(errorMessage)
        }
        throw new Error(errorMessage);
      }
    },
    []
  );

  // Collect the money made by the dispenser
  const collectMoneyFromDispenser = useCallback(async (id: string, data: CollectDispenserPayload) => {
    try {
      const updatedDispenser = await collectDispenser(id, data);
      setDispensers((prev) => 
        prev.map(d => d.id === updatedDispenser.id ? updatedDispenser : d)
      );
    } catch (err) {
      const errorMessage = 
        err instanceof Error ? err.message : "Failed to collect money from the dispenser";

        if(err instanceof ApiError) {
          toast.error(`${err.name}: (${err.type}) ${err.message}`, {
            description: `${err.summary}`,
          });
        } else {
          toast.error(errorMessage);
        }
    }
  },[])

  // Delete a dispenser
  const removeDispenser = useCallback(async (id: string) => {
    try {
      await deleteDispenser(id);
      setDispensers((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete dispenser!";
      throw new Error(errorMessage);
    }
  }, []);

  // Refresh all data
  const refreshData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    dispensers,
    owners,
    isLoading,
    error,
    createNewDispenser,
    updateEditedDispenser,
    collectMoneyFromDispenser,
    removeDispenser,
    refreshData,
  };
}

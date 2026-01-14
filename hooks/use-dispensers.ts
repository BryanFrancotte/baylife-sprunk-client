"use client";

import {
  createDispenser,
  deleteDispenser,
  fetchDispensers,
  fetchOwners,
} from "@/lib/api/dispensers";
import {
  CreateDispenserPayload,
  Dispenser,
  Owner,
} from "@/lib/types/dispensers";
import { useCallback, useEffect, useState } from "react";

// Hook return type
interface UseDispensersReturn {
  dispensers: Dispenser[];
  owners: Owner[];
  isLoading: boolean;
  error: string | null;
  createNewDispenser: (data: CreateDispenserPayload) => Promise<void>;
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
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create dispenser!";
        throw new Error(errorMessage);
      }
    },
    []
  );

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
    removeDispenser,
    refreshData,
  };
}

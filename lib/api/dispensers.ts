import {
  CreateDispenserPayload,
  Dispenser,
  Owner,
} from "../types/dispensers";

const API_BASE_URL = process.env.NEXT_PUBLIC_FRONT_API_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new Error(
      `Network error ${
        error instanceof Error ? error.message : "Unknown error!"
      }`
    );
  }
}

export async function fetchDispensers(): Promise<Dispenser[]> {
  return apiFetch<Dispenser[]>("/dispenser");
}

export async function createDispenser(
  data: CreateDispenserPayload
): Promise<Dispenser> {
  return apiFetch<Dispenser>("/dispenser", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateDispenser(
  id: string,
  data: Partial<CreateDispenserPayload>
): Promise<Dispenser> {
  return apiFetch<Dispenser>(`/dispenser/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteDispenser(id: string): Promise<void> {
  return apiFetch<void>(`/dispenser/${id}`, {
    method: "DELETE",
  });
}

export async function fetchOwners(): Promise<Owner[]> {
  return apiFetch<Owner[]>("/client");
}

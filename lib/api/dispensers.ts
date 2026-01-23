import {
  CollectDispenserPayload,
  CreateDispenserPayload,
  CreateOwnerPayload,
  Dispenser,
  Owner,
} from "../types/dispensers";
import { apiFetch } from "./baseApi";


export async function fetchDispensers(): Promise<Dispenser[]> {
  return apiFetch<Dispenser[]>("/dispenser");
}

export async function createDispenser(
  data: CreateDispenserPayload
): Promise<Dispenser> {

  console.log("api data: " + JSON.stringify(data))
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

export async function collectDispenser(
  id: string, 
  data: CollectDispenserPayload
): Promise<Dispenser> {
  return apiFetch<Dispenser>(`/dispenser/collect/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
} 

export async function deleteDispenser(id: string): Promise<void> {
  return apiFetch<void>(`/dispenser/${id}`, {
    method: "DELETE",
  });
}

export async function fetchOwners(): Promise<Owner[]> {
  return apiFetch<Owner[]>("/dispenser/owners");
}

export async function updateOwner(id: string, data: CreateOwnerPayload): Promise<Owner> {
  return apiFetch<Owner>(`/dispenser/owner/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}
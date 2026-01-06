"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Dispenser = {
  id: string
  name: string
  location: "Roxwood" | "SandyShores" | "PaletoBay" | "LosSantos" | "LasVenturas" | "CayoPerico"
  owner: string
  phoneNumber: string
  lastRefilled: Date
  lastRefilledBy: string
}

export const columns: ColumnDef<Dispenser>[] = [
  {
    accessorKey: "location",
    header: "Région"
  },
  {
    accessorKey: "owner",
    header: "Propriétaire"
  },
  {
    accessorKey: "phoneNumber",
    header: "Numéro de téléphone"
  },
  {
    accessorKey: "name",
    header: "Nom"
  },
  {
    accessorKey: "lastRefilled",
    header: "Dernière remplissage"
  },
  {
    accessorKey: "lastRefilledBy",
    header: "Rempli par"
  }
]
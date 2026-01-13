"use client";

import { ColumnDef } from "@tanstack/react-table";



export const columns: ColumnDef<Dispenser>[] = [
  {
    accessorKey: "location",
    header: "Localisation"
  },
  {
    accessorKey: "owner.name",
    header: "Propriétaire"
  },
  {
    accessorKey: "owner.phoneNumber",
    header: "Numéro de téléphone"
  },
  {
    accessorKey: "sharePercentage",
    header: "Poucentage client"
  },
  {
    accessorKey: "collectedAmout",
    header: "Argent récupérer"
  }
]
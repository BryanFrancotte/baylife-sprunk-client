import { Owner } from "@/lib/types/dispensers";
import { ColumnDef } from "@tanstack/react-table";

export const ownersColumns: ColumnDef<Owner>[] = [
  {
    accessorKey: "name",
    header: "Prénom / Nom"
  },
  {
    accessorKey: "phoneNumber",
    header: "Numéro de téléphone"
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => {
      const client = row.original
    }
  }
];
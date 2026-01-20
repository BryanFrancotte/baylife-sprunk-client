"use client";

import Image from "next/image";
import { Dispenser } from "@/lib/types/dispensers";
import { ColumnDef } from "@tanstack/react-table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BadgeDollarSign, ImageUp, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const getDispensersColumns = (handleStartEdit: (id: string)=> void): ColumnDef<Dispenser>[] => [
  {
    accessorKey: "location",
    header: "Localisation",
    cell: ({ row }) => {
      const locationName = row.original.location;
      const locationImgUrl = row.original.locationImgUrl;
      return (
        <HoverCard>
          <HoverCardTrigger className="hover:underline">{locationName}</HoverCardTrigger>
          <HoverCardContent>
            <Image
              className="rounded-lg"
              src={locationImgUrl ? locationImgUrl : "/placeholder.svg"}
              alt="location img"
              width={300}
              height={225}
            />
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "owner.name",
    header: "Propriétaire",
  },
  {
    accessorKey: "owner.phoneNumber",
    header: "Numéro de téléphone",
  },
  {
    accessorKey: "sharePercentage",
    header: "Pourcentage client",
    cell: ({ row }) => {
      const percentage = row.original.sharePercentage/100;
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "percent"
      }).format(percentage)
      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "collectedAmount",
    header: "Argent récupérer",
    cell: ({ row }) => {
      const amount = row.original.collectedAmount;
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "lastPeriondCollectedAmount",
    header: "Dernier dépôt",
    cell: ({row}) => {
      const amount = row.original.lastPeriondCollectedAmount
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "USD"
      }).format(amount);
      return <div>{formatted}</div>
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const dispenser = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(dispenser.id)}
            >
              <ImageUp />
              Upload Location Image
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toast.info("Collecting Money")}
            >
              <BadgeDollarSign />
              Relevé
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleStartEdit(dispenser.id)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

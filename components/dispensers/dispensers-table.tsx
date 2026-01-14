"use client"

import { CreateDispenserPayload, Dispenser, Owner } from "@/lib/types/dispensers";
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DispenserRow } from "./dispenser-row";

interface DispenserTableProps {
  dispensers: Dispenser[];
  owners: Owner[];
  onCreateDispenser: (data: CreateDispenserPayload) => Promise<void>;
}

export function DispensersTable({
  dispensers,
  owners,
  onCreateDispenser,
}: DispenserTableProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: dispensers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    }
  });

  const handleStartCreate = () => {
    setIsCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleSaveDispenser = async (data: CreateDispenserPayload) => {
    try {
      await onCreateDispenser(data);
      setIsCreating(false)
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Add Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Rechercher par localisation..."
            value={(table.getColumn("location")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("location")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
        <Button
          onClick={handleStartCreate}
          disabled={isCreating}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un distributeur
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Create Row - shows at top when isCreating is true */}
            {isCreating && (
              <DispenserRow
                owners={owners}
                isCreating={true}
                onSave={handleSaveDispenser}
                onCancel={handleCancelCreate}
              />
            )}

            {/* Existing Dispensers */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              !isCreating && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Aucun distributeur trouvé.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results Count */}
      <div className="text-xs text-muted-foreground">
        {table.getFilteredRowModel().rows.length} distributeur(s) au total
      </div>
    </div>
  );
}
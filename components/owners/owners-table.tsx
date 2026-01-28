"use client"

import { CreateOwnerPayload, Owner } from "@/lib/types/dispensers";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { getOwnersColumns } from "./owners-columns";
import { useState } from "react";
import { OwnerEditRow } from "./owners-edit-row";

interface OwnerTableProps {
  owners: Owner[],
  onUpdateOwner: (id: string, data: CreateOwnerPayload) => Promise<void>
}

export function OwnerTable({
  owners,
  onUpdateOwner
}: OwnerTableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleStartUpdate = (id: string) => {
    setEditingId(id);
    setIsEditing(true);
  }

  const handleSaveUpdate = async (id: string, data: CreateOwnerPayload) => {
    try {
      await onUpdateOwner(id, data);
    } catch(error) {
      throw error;
    } finally {
      setIsEditing(false)
    }
  }

  const handleCancelUpdate = () => {
    setIsEditing(false);
    setEditingId("");
  }

  const table = useReactTable({
    data: owners,
    columns: getOwnersColumns(handleStartUpdate),
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

  return (
    <div className="space-y-4">
      {/* Header with Search and Add Button */}
      <div className="flex items-center justify-start gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Rechercher par nom/prénom..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                if (isEditing && row.original.id === editingId) {
                  return (
                    <OwnerEditRow
                      key={row.original.id}
                      owner={row.original}
                      isUpdating={true}
                      onUpdate={handleSaveUpdate}
                      onCancel={handleCancelUpdate}
                    />
                  );
                }

                return (
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
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={getOwnersColumns.length}
                  className="h-24 text-center"
                >
                  Aucun Propriétaires trouvé.
                </TableCell>
              </TableRow>
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

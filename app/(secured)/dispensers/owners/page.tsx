"use client"

import { OwnerTable } from "@/components/owners/owners-table";
import { Button } from "@/components/ui/button";
import { useOwners } from "@/hooks/use-owners";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function DispenserOwnersPage() {
  const {
    owners,
    isLoading,
    error,
    updateEditedOwner,
    refreshData
  } = useOwners()
  
  // replace by skelleton 
  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading dispensers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4 max-w-md">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Error Loading Data</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button onClick={refreshData} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="container mx-auto py-10">
      <OwnerTable
        owners={owners}
        onUpdateOwner={updateEditedOwner} 
      />
    </div>
  );
}
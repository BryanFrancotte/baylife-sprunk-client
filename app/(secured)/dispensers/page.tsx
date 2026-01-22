"use client"

import { useDispensers } from "@/hooks/use-dispensers";
import { DispensersTable } from "@/components/dispensers/dispensers-table";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DispenserPage() {
  const {
    dispensers,
    owners,
    isLoading,
    error,
    createNewDispenser,
    updateEditedDispenser,
    collectMoneyFromDispenser,
    refreshData
  } = useDispensers()


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
      <DispensersTable
        dispensers={dispensers}
        owners={owners}
        onCreateDispenser={createNewDispenser}
        onUpdateDispenser={updateEditedDispenser}
        onCollectDispenser={collectMoneyFromDispenser}
      />
    </div>
  );
}
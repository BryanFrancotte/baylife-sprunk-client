import { Button } from "@/components/ui/button";
import { columns } from "./components/column";
import { DataTable } from "./components/data-table";
import { Funnel, Plus } from "lucide-react";

export default async function DispenserPage() {
  const data = []

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between py-2">
        <Button variant="outline" size="sm">
          <Funnel />
          filtrer
        </Button>
        <Button variant="outline" size="sm">
          <Plus />
          Ajouter un distributeur
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
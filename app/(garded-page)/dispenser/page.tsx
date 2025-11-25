import { columns, Dispenser } from "./components/column";
import { DataTable } from "./components/data-table";

async function getData(): Promise<Dispenser[]> {
  return []
}

export default async function DispenserPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
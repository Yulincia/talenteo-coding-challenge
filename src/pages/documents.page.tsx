import { DataTable } from "@/components/data-table";
import data from "@/features/documents/api/data.json";
// import DocumentsDataTable from "@/features/documents/components/documents-datatable";

export function DocumentsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={data} />
          {/* <DocumentsDataTable /> */}
        </div>
      </div>
    </div>
  );
}

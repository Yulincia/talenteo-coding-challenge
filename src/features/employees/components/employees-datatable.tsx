
import type { ColumnDef } from "@tanstack/react-table";
import { DragHandle } from "@/components/data-table/drag-handle";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/data-table/datatable";
import type { Employee } from "../types/employee.type";
import type { Entity, IQuery } from "@/types/api.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEmployees } from "../api/get-employees";
import { useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import DeleteEmployeeAlert from "./delete-employee-alert";
import EmployeeForm from "./employee-form";

function EmployeesDataTable() {

  const [query, setQuery] = useState<IQuery>({ search: "" });
  const { data: employees = [], isLoading } = useEmployees(query);

  const columns: ColumnDef<Entity<Employee>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={Number(row.original.id)} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="flex items-center gap-2 pr-4">
        <img src={row.original.avatar} className="size-7 rounded" />
        <span>{row.original.firstName} {row.original.lastName}</span>
      </div>,
      enableHiding: false,
    },
    {
      accessorKey: "registratonNumber",
      header: "Registration number",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of birth",
      cell: ({ row }) => (
        <div>
          {new Date(row.original.dateOfBirth).toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "jobTitle",
      header: "Job title",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className='flex items-center justify-center gap-3'>
          <Dialog>
            <DialogTrigger>
              <IconPencil className='text-indigo-600 size-5 cursor-pointer' />
            </DialogTrigger>
            <DialogContent aria-describedby='' className='max-w-full overflow-auto'>
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              <EmployeeForm employee={{ ...row.original }} />
            </DialogContent>
          </Dialog>

          <DeleteEmployeeAlert employeeId={row.original.id} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      initialData={employees}
      updateQuery={setQuery}
      isLoading={isLoading && !employees.length}
    />
  );
}

export default EmployeesDataTable;

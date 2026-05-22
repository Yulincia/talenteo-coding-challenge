/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useId, useMemo, useState } from "react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import type { IQuery } from "@/types/api.types";
import { DataTablePagination } from "./datatable-pagination";
import { DataTableViewOptions } from "./datatable-view-options";
import { DraggableRow } from "./draggable-row";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  initialData: TData[]
  totalPages?: number
  totalRows?: number
  limit?: number
  currentPage?: number
  updateQuery?: (query: IQuery | ((prevState: IQuery) => IQuery)) => void
}

export function DataTable<TData, TValue>({
  columns,
  initialData,
  totalPages,
  totalRows,
  limit,
  currentPage,
  updateQuery,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage ? (currentPage - 1) : 0,
    pageSize: limit || 10,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const sortableId = useId();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }: any) => id) || [],
    [data],
  );

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    if (updateQuery) {
      updateQuery!((prevState: IQuery) => ({
        ...prevState,
        search: debouncedSearch,
        // ...(debouncedSearch && { search: debouncedSearch }),
        // page: 1
      }));
      setPagination({ pageIndex: 0, pageSize: limit || 10 });
    }
  }, [debouncedSearch, limit, updateQuery]);

  useEffect(() => {
    setData(initialData)
  }, [initialData]);

  const table = useReactTable({
    data,
    columns,
    ...(totalPages && { pageCount: totalPages }),
    ...(totalRows && { rowCount: totalRows }),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getRowId: (row) => (row as any).id.toString(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (updater) => {
      // make sure updater is callable (to avoid typescript warning)
      if (typeof updater !== "function") {return;}

      if (updateQuery) {
        const newPageInfo = updater(table.getState().pagination);
        setPagination(newPageInfo);
        updateQuery((prevState: IQuery) => ({
          ...prevState,
          page: newPageInfo.pageIndex + 1,
          limit: newPageInfo.pageSize,
        }));
      } else {
        const newPageInfo = updater(table.getState().pagination);
        setPagination(newPageInfo);
      }
    },
    manualPagination: !!updateQuery, //we're doing manual "server-side" pagination
    state: {
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters,
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between gap-4'>
        {!!updateQuery &&
        <Input
          placeholder='Search ...'
          className='w-full md:max-w-96 max-h-8'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        }
        <DataTableViewOptions table={table} />
      </div>
      <div className='overflow-hidden rounded-lg border'>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <DataTablePagination table={table} manualPagination={!!updateQuery} />
    </div>
  );
}

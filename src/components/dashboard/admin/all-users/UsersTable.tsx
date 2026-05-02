import { User } from "@prisma/client";
import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
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
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STATUS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const UsersTable = ({ data }: { data: User[] }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "joinedAt",
      desc: true,
    },
  ]);

  const columns: ColumnDef<User>[] = [
    {
      id: "info",
      accessorFn: (row) => row.firstName + " " + row.lastName,
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-text font-semibold">
          {row?.original?.firstName + " " + row?.original?.lastName}
        </p>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-navy font-semibold">
          {row?.original?.email}
        </p>
      ),
    },
    {
      accessorKey: "joinedAt",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined At <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-text font-semibold">
          {formatDate(new Date(row?.original?.joinedAt))}
        </p>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        return (
          <p className="text-[13px] text-navy font-semibold">
            {row?.original?.role}
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          style={{
            backgroundColor: STATUS[row?.original?.status]?.bg,
            color: STATUS[row?.original?.status]?.text,
          }}
          className="rounded-full uppercase font-semibold text-[11px]"
        >
          {row?.original?.status}
        </Badge>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto rounded-md border border-border text-sm text-navy">
      <Table className="min-w-[750px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;

"use client";

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
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STATUS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowDown, EllipsisVertical } from "lucide-react";

interface VendorBookings {
  tour: {
    tourName: string;
    price: number;
    gallery: {
      public_id: string;
      url: string;
    }[];
  };
  userId: string;
  tourId: string;
  id: string;
  createdAt: Date;
  status: string;
  startDate: Date;
  endDate: Date;
  totalPeople: number;
  tourCreator: string;
}

const BookingsTable = ({ bookings }: { bookings: VendorBookings[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<VendorBookings>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div>{row.original.id?.slice(0, 8)}</div>,
    },
    {
      accessorKey: "tour",
      header: "Tour",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <Image
                src={row?.original?.tour?.gallery?.[0]?.url}
                width={50}
                height={50}
                alt=""
                className="rounded-lg aspect-square"
              />
            </div>
            <p className="line-clamp-2 max-w-[220px] whitespace-pre-wrap shrink-0">
              {row?.original?.tour?.tourName}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date <ArrowDown className="size-4" />
        </div>
      ),
      cell: ({ row }) => (
        <p>{formatDate(new Date(row?.original?.startDate))}</p>
      ),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date <ArrowDown className="size-4" />
        </div>
      ),
      cell: ({ row }) => <p>{formatDate(new Date(row?.original?.endDate))}</p>,
    },
    {
      accessorKey: "tour.price",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowDown className="size-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div>{formatCurrency(row?.original?.tour?.price)}</div>
      ),
    },
    {
      accessorKey: "totalPeople",
      header: "Group",
      cell: ({ row }) => <p>{row?.original?.totalPeople} People</p>,
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
          className="rounded-full uppercase"
        >
          {row?.original?.status}
        </Badge>
      ),
    },
    {
      id: "action",
      cell: ({ row }) => {
        const status = row?.original?.status;

        return (
          <>
            {status !== "completed" && (
              <Button size="icon" variant="ghost" className="hover:bg-muted/20">
                <EllipsisVertical className="size-5" />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto rounded-md border border-border text-sm text-navy">
      <Table className="min-w-[880px]">
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

export default BookingsTable;

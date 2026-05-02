import { Prisma } from "@prisma/client";
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
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = Prisma.BookingGetPayload<{
  include: {
    tour: {
      select: {
        tourName: true;
        gallery: true;
        price: true;
      };
    };
  };
}>;

const BookingsTable = ({ data }: { data: Props[] }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "startDate",
      desc: true,
    },
  ]);

  const columns: ColumnDef<Props>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <p>{row?.original?.id?.slice(0, 8)}</p>,
    },
    {
      id: "tour",
      accessorFn: (row) => row.tour.tourName,
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tour <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="shrink-0 w-[50px] relative aspect-square">
            <Image
              src={row?.original?.tour?.gallery?.[0]?.url}
              alt=""
              fill
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <p className="text-[14px] text-navy line-clamp-2 font-semibold whitespace-pre-wrap max-w-[270px] shrink-0">
            {row?.original?.tour?.tourName}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-text font-semibold">
          {formatDate(new Date(row?.original?.startDate))}
        </p>
      ),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-text font-semibold">
          {formatDate(new Date(row?.original?.endDate))}
        </p>
      ),
    },
    {
      id: "price",
      accessorFn: (row) => row.tour.price,
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <p className="text-[13px] text-text font-semibold">
            {formatCurrency(row?.original?.tour?.price)}
          </p>
        );
      },
    },
    {
      accessorKey: "group",
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
    <>
      <div className="overflow-x-auto rounded-md border border-border text-sm text-navy">
        <Table className="min-w-[860px]">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BookingsTable;

import { Tour } from "@prisma/client";
import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import {  formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STATUS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCtx } from "@/context/Context";
import { Pencil } from "lucide-react";

const ListingsTable = ({ tours }: { tours: Tour[] }) => {
  const router = useRouter();
  const { setTourToEdit } = useCtx();

  const columns: ColumnDef<Tour>[] = [
    {
      id: "tour",
      accessorFn: (row) => row.tourName,
      header: () => <div>Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <Image
              src={row?.original?.gallery?.[0]?.url}
              alt=""
              width={890}
              height={750}
              className="w-[80px] h-[50px] object-cover rounded-md"
            />
          </div>
          <p className="text-[14px] text-navy line-clamp-2 font-semibold whitespace-pre-wrap max-w-[300px] shrink-0">
            {row?.original?.tourName}
          </p>
        </div>
      )
    },
    {
      accessorKey: "price",
      header: () => <div>Price</div>,
      cell: ({ row }) => (
        <p className="text-[13px] text-dark-1 font-semibold">
          {formatCurrency(row?.original?.price)}
        </p>
      )
    },
    {
      accessorKey: "createdAt",
      header: () => <div>Created At</div>,
      cell: ({ row }) => (
        <p className="text-[13px] text-dark-1 font-semibold">
          {formatDate(new Date(row?.original?.createdAt))}
        </p>
      )
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
      )
    },
    {
      id: "action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                setTourToEdit(row?.original);
                router.push("/vendor/edit-listings");
              }}
              size={"icon"}
              variant={"ghost"}
            >
              <Pencil />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tours,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md border border-border text-sm text-navy">
      <Table className="min-w-[800px]">
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

export default ListingsTable;

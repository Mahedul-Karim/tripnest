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
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LinearProgress from "@/components/common/loader/LinearProgress";
import { updateWithdrawStatus } from "@/lib/actions/admin";

type Withdraw = Prisma.WithdrawGetPayload<{
  include: {
    user: {
      select: {
        firstName: true;
        lastName: true;
      };
    };
  };
}>;

const WithdrawTable = ({ data }: { data: Withdraw[] }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await updateWithdrawStatus(id);

      if (!res.success) throw new Error(res.message);

      return res;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["adminAllEarnings"],
      });
      toast.success("Withdraw data updated successfully!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const columns: ColumnDef<Withdraw>[] = [
    {
      accessorKey: "accountNumber",
      header: "Account",
      cell: ({ row }) => (
        <p className="text-[13px] text-navy font-semibold">
          {row?.original?.accountNumber}
        </p>
      ),
    },
    {
      id: "user",
      accessorFn: (row) => row.user.firstName,
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-navy font-semibold">
          {row?.original?.user?.firstName + " " + row?.original?.user?.lastName}
        </p>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-dark-1 font-semibold">
          {formatCurrency(row?.original?.amount)}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requested At <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <p className="text-[13px] text-navy font-semibold">
            {formatDate(new Date(row?.original?.createdAt))}
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

    {
      id: "action",
      cell: ({ row }) => {
        const status = row?.original?.status;

        return (
          <>
            {status !== "approved" && (
              <Button
                size="icon"
                variant="ghost"
                disabled={isPending}
                onClick={() => mutate({ id: row?.original?.id })}
              >
                <Check className="size-5" />
              </Button>
            )}
          </>
        );
      },
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
      {isPending && <LinearProgress />}
      <div className="overflow-x-auto rounded-md border border-border text-sm text-navy">
        <Table className="min-w-[760px]">
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

export default WithdrawTable;

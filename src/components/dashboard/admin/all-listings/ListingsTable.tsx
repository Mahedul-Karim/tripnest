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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { STATUS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CircleCheckBig, EllipsisVertical, X } from "lucide-react";
import { updateTourStatus } from "@/lib/actions/tour";
import { Status } from "@prisma/client";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LinearProgress from "@/components/common/loader/LinearProgress";

type Props = {
  id: string;
  tourName: string;
  price: number;
  status: string;
  gallery: {
    url: string;
  }[];
  creatorId: string;
  createdAt: Date;
  creator?: {
    firstName: string;
    lastName: string;
  };
};

const ListingsTable = ({ data }: { data: Props[] }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ status, id }: { status: Status; id: string }) => {
      const res = await updateTourStatus(status, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["adminAllTours"],
      });
      toast.success(data.message);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleStatusUpdate = async (status: Status, id: string) => {
    mutate({ status, id });
  };

  const columns: ColumnDef<Props>[] = [
    {
      id: "tour",
      accessorFn: (row) => row.tourName,
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent dark:hover:bg-transparent dark:hover:text-text has-[>svg]:px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="shrink-0 w-20 relative aspect-[16/12]">
            <Image
              src={row?.original?.gallery?.[0]?.url}
              alt=""
              fill
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <p className="text-[14px] text-navy line-clamp-2 font-semibold whitespace-pre-wrap max-w-[330px] shrink-0">
            {row?.original?.tourName}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-text font-semibold">
          {formatCurrency(row?.original?.price)}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="font-semibold hover:bg-transparent has-[>svg]:px-0 dark:hover:bg-transparent dark:hover:text-text"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="text-[13px] text-text font-semibold">
          {formatDate(new Date(row?.original?.createdAt))}
        </p>
      ),
    },
    {
      accessorKey: "creator",
      header: "Creator",
      cell: ({ row }) => {
        const creator = row?.original?.creator;

        return (
          <p className="text-[13px] text-navy font-semibold">
            {creator?.firstName + " " + creator?.lastName?.at(0) + "."}
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
        const id = row?.original?.id;

        return (
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"ghost"} className="dark:hover:bg-muted/5 dark:hover:text-white">
                  <EllipsisVertical className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {status !== "approved" && (
                  <DropdownMenuItem asChild>
                    <button
                      className="w-full"
                      onClick={() => handleStatusUpdate("approved", id)}
                    >
                      <CircleCheckBig /> Approve
                    </button>
                  </DropdownMenuItem>
                )}
                {status !== "rejected" && (
                  <DropdownMenuItem asChild>
                    <button
                      className="w-full"
                      onClick={() => handleStatusUpdate("rejected", id)}
                    >
                      <X /> Decline
                    </button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

export default ListingsTable;

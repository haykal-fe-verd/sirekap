import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
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
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import DebouncedInput from "./debounced-input";
import { router } from "@inertiajs/react";
import { pickBy } from "lodash";

export function DataTable({ columns, data, pagination }) {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel({
            rowCount: pagination?.total,
            pageSize: pagination?.per_page,
            currentPage: pagination?.current_page,
            pageCount: pagination?.last_page,
            setPageIndex: pagination?.current_page,
        }),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            globalFilter,
        },
    });
    React.useEffect(() => {
        if (table.getState().globalFilter !== "") {
            router.get(
                route(
                    "user.index",
                    pickBy({
                        limit: table.getState().pagination.pageSize,
                        page: table.getState().pagination.pageIndex + 1,
                        search: table.getState().globalFilter,
                    }),
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                )
            );
        }
    }, [table.getState().globalFilter]);

    return (
        <div className="space-y-5">
            <DebouncedInput
                value={globalFilter}
                onChange={(value) => setGlobalFilter(String(value))}
            />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
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
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
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

            {pagination ? (
                <div className="flex flex-col items-center justify-between w-full mt-5 md:flex-row ">
                    <div className="w-fit flex gap-2">
                        showing
                        <div className="font-bold"> {pagination.from}</div> to
                        <div className="font-bold"> {pagination.to} </div>
                        of
                        <div className="font-bold"> {pagination.total} </div>
                        results
                    </div>
                    <div className="w-full">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={
                                            pagination?.current_page > 1
                                                ? `?page=${
                                                      pagination?.current_page -
                                                      1
                                                  }`
                                                : undefined
                                        }
                                    />
                                </PaginationItem>
                                {Array.from(
                                    { length: pagination.last_page },
                                    (_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <PaginationLink
                                                href={`?page=${i + 1}`}
                                                isActive={
                                                    i + 1 ===
                                                    pagination.current_page
                                                }
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href={
                                            pagination?.current_page <
                                            pagination?.last_page
                                                ? `?page=${
                                                      pagination?.current_page +
                                                      1
                                                  }`
                                                : undefined
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

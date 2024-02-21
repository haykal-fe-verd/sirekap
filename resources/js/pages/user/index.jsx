import React from "react";
import { Head } from "@inertiajs/react";
import { DataTable } from "@/components/data-table";
import { PlusCircleIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function index({ data, auth }) {
    const columns = [
        {
            id: "no",
            header: "No",
            cell: ({ row }) => {
                return (
                    <span>
                        {(data?.meta?.from / data?.meta?.per_page) *
                            data?.meta?.per_page +
                            row?.index}
                    </span>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            id: "aksi",
            header: "Aksi",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    href={route("user.edit", row.original.id)}
                                    className="w-full"
                                >
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={route(
                                        "user.destroy",
                                        row.original.id
                                    )}
                                    method="delete"
                                    type="button"
                                    className="w-full"
                                >
                                    Hapus
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-5">
                            <Button asChild className="inline-flex gap-3">
                                <Link href={route("user.create")}>
                                    <PlusCircleIcon className="h-5 w-5" />
                                    <span>Tambah User</span>
                                </Link>
                            </Button>
                            <DataTable
                                columns={columns}
                                data={data?.data}
                                pagination={data?.meta}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default index;

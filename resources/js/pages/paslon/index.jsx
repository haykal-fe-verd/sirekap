import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CreateModal from "./create";

export default function index({ auth, data }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Partai & Calon
                </h2>
            }
        >
            <Head title="Partai & Calon" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="rounded-md overflow-hidden space-y-5">
                                <CreateModal />
                                <Table>
                                    <TableHeader className="bg-gray-900">
                                        <TableRow>
                                            {data?.map((item, index) => (
                                                <TableHead
                                                    key={index}
                                                    className="text-left border text-white py-6"
                                                >
                                                    {item.nomor}. {item.nama}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data[0]?.calon.map((_, index) => (
                                            <TableRow key={index}>
                                                {data.map((partai) => (
                                                    <TableCell
                                                        key={partai.id}
                                                        className="text-left text-nowrap border"
                                                    >
                                                        {`${
                                                            partai.calon[index]
                                                                ?.nomor ?? "-"
                                                        }. `}
                                                        {
                                                            partai.calon[index]
                                                                ?.nama
                                                        }
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

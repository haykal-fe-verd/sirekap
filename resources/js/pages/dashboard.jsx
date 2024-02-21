import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DataTable } from "@/components/data-table";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Dashboard({ auth, top10partai, top10calon }) {
    console.log("🚀  top10calon ==>", top10calon);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl flex flex-col md:flex-row mx-auto sm:px-6 lg:px-8 md:space-x-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 space-y-5">
                            <h1 className="font-bold text-2xl uppercase">
                                Top 10 partai
                            </h1>
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Partai</TableHead>
                                            <TableHead>Suara</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {top10partai?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {`${item.nomor}. ${item.nama}`}
                                                </TableCell>
                                                <TableCell>
                                                    {item.suara_sum_suara}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 space-y-5">
                            <h1 className="font-bold text-2xl uppercase">
                                Top 10 Caleg
                            </h1>
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Suara</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {top10calon?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {`${item.nama}`}
                                                </TableCell>
                                                <TableCell>
                                                    {item.suara_sum_suara}
                                                </TableCell>
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

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Progress } from "@/components/ui/progress";

import { Head } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Dashboard({
    auth,
    top10partai,
    top10calon,
    totalSuaraRamadhana,
    totalSuaraIrmawan,
    totalSuaraCalon,
    totalSuaraPartai,
    dapilPkb,
}) {
    const targetSuara = 100000;
    const totalSuara = totalSuaraRamadhana.suara_sum_suara;
    const totalKeseluruhanSuara = totalSuaraCalon + totalSuaraPartai;

    const totalSuaraPercentage = (totalSuara / targetSuara) * 100;
    const formattedTotalSuaraPercentage = totalSuaraPercentage.toFixed(2);

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

            <div className="py-12 space-y-6">
                <div className="max-w-7xl mx-auto sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 space-y-5">
                            <div className="flex flex-row justify-between">
                                <div className="font-bold text-2xl text-center">
                                    Capaian Target <br /> (100.000)
                                </div>
                                <div className="font-bold text-2xl text-center">
                                    Jumlah Suara Saat Ini <br />{" "}
                                    {totalSuaraRamadhana.suara_sum_suara} Suara
                                    ({formattedTotalSuaraPercentage}%)
                                </div>
                            </div>
                            <Progress value={totalSuaraPercentage} />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full">
                        <div className="p-6 text-gray-900 space-y-5 w-full">
                            <div className="w-full flex justify-between items-center gap-5">
                                <div className="w-full text-nowrap">
                                    {totalSuaraRamadhana.nama}
                                </div>
                                <div className="bg-emerald-800 w-full text-white text-center p-2 rounded-md">
                                    {totalSuaraRamadhana.suara_sum_suara} suara
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-center gap-5">
                                <div className="w-full  text-nowrap">
                                    {totalSuaraIrmawan.nama}
                                </div>
                                <div className="bg-rose-800 w-full text-white text-center p-2 rounded-md">
                                    {totalSuaraIrmawan.suara_sum_suara} suara
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                10 Suara Caleg Terbanyak
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

                <div className="max-w-7xl flex flex-col md:flex-row mx-auto sm:px-6 lg:px-8 md:space-x-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full h-fit">
                        <div className="p-6 text-gray-900 space-y-5">
                            <h1 className="font-bold text-2xl uppercase">
                                Dapil 1 Suara PKB
                            </h1>
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead className="w-full text-center">
                                                Suara
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dapilPkb?.calon?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="text-nowrap">
                                                    {`${item.nama}`}
                                                </TableCell>
                                                <TableCell className="flex flex-row justify-between gap-3 w-full  ">
                                                    <h2 className="text-right">
                                                        {item.suara}
                                                    </h2>
                                                    <Progress
                                                        className="w-1/2"
                                                        value={
                                                            (item.suara /
                                                                totalKeseluruhanSuara) *
                                                            100
                                                        }
                                                    />

                                                    <h2>
                                                        {totalKeseluruhanSuara}
                                                    </h2>
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

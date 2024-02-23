import { Link, Head } from "@inertiajs/react";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
export default function Welcome({
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
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Login Petugas
                            </Link>
                        </>
                    )}
                </div>

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
                                        {totalSuaraRamadhana.suara_sum_suara}{" "}
                                        Suara ({formattedTotalSuaraPercentage}%)
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
                                        {totalSuaraRamadhana.suara_sum_suara}{" "}
                                        suara
                                    </div>
                                </div>
                                <div className="w-full flex justify-between items-center gap-5">
                                    <div className="w-full  text-nowrap">
                                        {totalSuaraIrmawan.nama}
                                    </div>
                                    <div className="bg-rose-800 w-full text-white text-center p-2 rounded-md">
                                        {totalSuaraIrmawan.suara_sum_suara}{" "}
                                        suara
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
                                                        <div className="flex gap-5 items-center justify-between">
                                                            <h1>
                                                                {`${item.nomor}. ${item.nama}`}
                                                            </h1>
                                                            <img
                                                                src={`/storage/${item.logo}`}
                                                                alt={`logo-${item.nama}`}
                                                                className="w-6 h-6"
                                                            />
                                                        </div>
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
                                                        <div className="flex gap-5 items-center justify-between">
                                                            <h1>
                                                                {`${item.nama}`}
                                                            </h1>
                                                            <img
                                                                src={`/storage/${item.partai.logo}`}
                                                                alt={`logo-${item.nama}`}
                                                                className="w-6 h-6"
                                                            />
                                                        </div>
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
                                <div className="flex items-center gap-5">
                                    <h1 className="font-bold text-2xl uppercase">
                                        Dapil 1 Suara PKB
                                    </h1>
                                    <img
                                        src={`/storage/${dapilPkb.logo}`}
                                        alt={`logo-${dapilPkb.nama}`}
                                        className="w-10 h-10"
                                    />
                                </div>

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
                                            {dapilPkb?.calon?.map(
                                                (item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell className="text-nowrap">
                                                            <h1>{`${item.nama}`}</h1>
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
                                                                {
                                                                    totalKeseluruhanSuara
                                                                }
                                                            </h2>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

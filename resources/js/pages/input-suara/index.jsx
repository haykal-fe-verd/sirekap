import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { pickBy } from "lodash";
import { Input } from "@/components/ui/input";

export default function index({ auth, partai, calon }) {
    const [kabupaten, setKabupaten] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [idKabupaten, setIdKabupaten] = useState("");
    const [idKecamatan, setIdKecamatan] = useState("");
    const [idKelurahan, setIdKelurahan] = useState("");
    const [tps, setTps] = useState("");
    const [showForm, setShowForm] = useState(false);

    const [values, setValues] = useState({
        id_calon: calon.reduce((acc, calonItem) => {
            acc[calonItem.id] = 0;
            return acc;
        }, {}),
        id_partai: partai.reduce((acc, partaiItem) => {
            acc[partaiItem.id] = 0;
            return acc;
        }, {}),
    });

    //! events
    const jmlhPenggunaHakPilih =
        parseInt(values?.dpt, 10) +
            parseInt(values?.dptb, 10) +
            parseInt(values?.dpk, 10) || 0;

    const jmlhSuaraSahdanTidak =
        parseInt(values?.suara_sah, 10) +
            parseInt(values?.suara_tidak_sah, 10) || 0;

    const onClickTampilkan = () => {
        setShowForm(true);
    };

    const onchangeKabupaten = (e) => {
        const data = e.split("/");
        const id = data[0];
        const nama = data[1];

        setIdKabupaten(id);

        setValues((values) => ({
            ...values,
            id_kabupaten: id,
            nama_kabupaten: nama,
        }));
    };
    const onchangeKecamatan = (e) => {
        const data = e.split("/");
        const id = data[0];
        const nama = data[1];

        setIdKecamatan(id);
        setValues((values) => ({
            ...values,
            id_kecamatan: id,
            nama_kecamatan: nama,
        }));
    };

    const onchangeKelurahan = (e) => {
        const data = e.split("/");
        const id = data[0];
        const nama = data[1];

        setIdKelurahan(id);
        setValues((values) => ({
            ...values,
            id_kelurahan: id,
            nama_kelurahan: nama,
        }));
    };

    const onChangeTps = (e) => {
        setTps(e.target.value);
        setValues((values) => ({
            ...values,
            nomor_tps: e.target.value,
        }));
    };

    async function onSubmit(e) {
        e.preventDefault();

        router.post(route("input.suara.store"), values);
    }

    const getKabupaten = async () => {
        const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/11.json`
        )
            .then((response) => response.json())
            .then((regencies) => setKabupaten(regencies));
    };

    const getKecamatan = async () => {
        const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${idKabupaten}.json`
        )
            .then((response) => response.json())
            .then((districts) => setKecamatan(districts));
    };

    const getKelurahan = async () => {
        const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${idKecamatan}.json`
        )
            .then((response) => response.json())
            .then((villages) => setKelurahan(villages));
    };

    useEffect(() => {
        getKabupaten();
    }, []);

    useEffect(() => {
        if (idKabupaten) {
            getKecamatan();
        }
    }, [idKabupaten]);

    useEffect(() => {
        if (idKecamatan) {
            getKelurahan();
        }
    }, [idKecamatan]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Input Suara
                </h2>
            }
        >
            <Head title="Input Suara" />
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="rounded-md ">
                                    <div className="space-y-6">
                                        <h1 className="font-bold text-2xl uppercase">
                                            Filter
                                        </h1>
                                        <div>
                                            <Label htmlFor="kabupaten">
                                                Kabupaten
                                            </Label>
                                            <Select
                                                onValueChange={(e) =>
                                                    onchangeKabupaten(e)
                                                }
                                                defaultValue={idKabupaten}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kabupaten" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {kabupaten?.map((item) => (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={`${item.id}/${item.name}`}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="kecamatan">
                                                Kecamatan
                                            </Label>
                                            <Select
                                                onValueChange={(e) =>
                                                    onchangeKecamatan(e)
                                                }
                                                defaultValue={idKecamatan}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kecamatan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {kecamatan?.map((item) => (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={`${item.id}/${item.name}`}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="kelurahan">
                                                Kelurahan
                                            </Label>
                                            <Select
                                                onValueChange={(e) =>
                                                    onchangeKelurahan(e)
                                                }
                                                defaultValue={idKelurahan}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kelurahan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {kelurahan?.map((item) => (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={`${item.id}/${item.name}`}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="nomor_tps">
                                                Nomor TPS
                                            </Label>
                                            <Input
                                                type="text"
                                                onChange={(e) => onChangeTps(e)}
                                                defaultValue={tps}
                                            />
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <Button
                                                type="button"
                                                onClick={onClickTampilkan}
                                                disabled={
                                                    !idKabupaten ||
                                                    !idKecamatan ||
                                                    !idKelurahan ||
                                                    !tps
                                                }
                                            >
                                                Tampilkan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showForm && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="rounded-md ">
                                        <div className="space-y-6">
                                            <h1 className="font-bold text-2xl uppercase">
                                                data pengguna hak pilih
                                            </h1>
                                            <div>
                                                <Label htmlFor="dpt">
                                                    Jumlah hak pilih dalam DPT
                                                </Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValues((values) => ({
                                                            ...values,
                                                            dpt: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="dptb">
                                                    Jumlah hak pilih dalam DPTb
                                                </Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValues((values) => ({
                                                            ...values,
                                                            dptb: e.target
                                                                .value,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="dpk">
                                                    Jumlah hak pilih dalam DPK
                                                </Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValues((values) => ({
                                                            ...values,
                                                            dpk: e.target.value,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="pengguna_hak_pilih">
                                                    Jumlah pengguna hak pilih
                                                </Label>
                                                <Input
                                                    type="text"
                                                    value={jmlhPenggunaHakPilih}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showForm && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="rounded-md ">
                                        <div className="space-y-6">
                                            <h1 className="font-bold text-2xl uppercase">
                                                jumlah suara sah dan tidak sah
                                            </h1>
                                            <div>
                                                <Label htmlFor="suara_sah">
                                                    Jumlah seluruh suara sah
                                                </Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValues((values) => ({
                                                            ...values,
                                                            suara_sah:
                                                                e.target.value,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="suara_tidak_sah">
                                                    Jumlah seluruh suara tidak
                                                    sah
                                                </Label>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValues((values) => ({
                                                            ...values,
                                                            suara_tidak_sah:
                                                                e.target.value,
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="suara">
                                                    Jumlah seluruh suara sah dan
                                                    suara tidak sah
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={jmlhSuaraSahdanTidak}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showForm && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="rounded-md ">
                                        <div className="space-y-6">
                                            <h1 className="font-bold text-2xl uppercase">
                                                perolehan suara
                                            </h1>
                                            <Table className="w-full">
                                                <TableHeader className="bg-gray-900">
                                                    <TableRow>
                                                        <TableHead
                                                            className="text-white border py-6"
                                                            colSpan="2"
                                                        >
                                                            Uraian
                                                        </TableHead>
                                                        <TableHead className="text-white w-[200px] border">
                                                            Suara
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {partai?.map(
                                                        (
                                                            partaiItem,
                                                            partaiIndex
                                                        ) => (
                                                            <React.Fragment
                                                                key={
                                                                    partaiIndex
                                                                }
                                                            >
                                                                <TableRow className="bg-secondary">
                                                                    <TableCell className="border text-center">
                                                                        {
                                                                            partaiItem.nomor
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="border">
                                                                        {
                                                                            partaiItem.nama
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="border">
                                                                        <Input
                                                                            type="number"
                                                                            value={
                                                                                values
                                                                                    .id_partai[
                                                                                    partaiItem
                                                                                        .id
                                                                                ]
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setValues(
                                                                                    (
                                                                                        values
                                                                                    ) => ({
                                                                                        ...values,
                                                                                        id_partai:
                                                                                            {
                                                                                                ...values.id_partai,
                                                                                                [partaiItem.id]:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            },
                                                                                    })
                                                                                );
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                {partaiItem.calon.map(
                                                                    (
                                                                        calonItem,
                                                                        index
                                                                    ) => (
                                                                        <TableRow
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <TableCell className="border"></TableCell>
                                                                            <TableCell className="border">{`${calonItem.nomor}. ${calonItem.nama}`}</TableCell>
                                                                            <TableCell className="border">
                                                                                <Input
                                                                                    type="number"
                                                                                    value={
                                                                                        values
                                                                                            .id_calon[
                                                                                            calonItem
                                                                                                .id
                                                                                        ]
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setValues(
                                                                                            (
                                                                                                values
                                                                                            ) => ({
                                                                                                ...values,
                                                                                                id_calon:
                                                                                                    {
                                                                                                        ...values.id_calon,
                                                                                                        [calonItem.id]:
                                                                                                            e
                                                                                                                .target
                                                                                                                .value,
                                                                                                    },
                                                                                            })
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showForm && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="rounded-md ">
                                        <div className="space-y-6">
                                            <h1 className="font-bold text-2xl uppercase">
                                                C1 plano
                                            </h1>
                                            <div>
                                                <Label htmlFor="c1">
                                                    C1 Plano
                                                </Label>
                                                <Input
                                                    type="file"
                                                    onChange={(e) => {
                                                        setValues((values) => ({
                                                            ...values,
                                                            c1: e.target
                                                                .files[0],
                                                        }));
                                                    }}
                                                />
                                            </div>

                                            <Button type="submit">
                                                Simpan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

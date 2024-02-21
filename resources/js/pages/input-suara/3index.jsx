import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Select from "react-select";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ModalTps from "./modal";
import { cn } from "@/lib/utils";

function index({ auth, tps, partai, calon }) {
    //! states
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const [kabupaten, setKabupaten] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [idKabupaten, setIdKabupaten] = useState(
        urlParams.get("id_kabupaten") || ""
    );
    console.log("🚀  idKabupaten ==>", idKabupaten);
    const [idKecamatan, setIdKecamatan] = useState(
        urlParams.get("id_kecamatan") || ""
    );
    console.log("🚀  idKecamatan ==>", idKecamatan);
    const [idKelurahan, setIdKelurahan] = useState(
        urlParams.get("id_kelurahan") || ""
    );
    console.log("🚀  idKelurahan ==>", idKelurahan);
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

        urlParams.set("id_kabupaten", id);
        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
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

        urlParams.set("id_kecamatan", id);
        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
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

        urlParams.set("id_kelurahan", id);
        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
    };

    //! function
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
    const [open, setOpen] = React.useState(false);

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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                    {/* filter */}
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
                                        select
                                    </div>
                                    <div>
                                        <Label htmlFor="kecamatan">
                                            Kecamatan
                                        </Label>
                                        select
                                    </div>
                                    <div>
                                        <Label htmlFor="kelurahan">
                                            Kelurahan
                                        </Label>
                                        select
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <Button
                                            type="button"
                                            onClick={onClickTampilkan}
                                            disabled={
                                                !idKabupaten ||
                                                !idKecamatan ||
                                                !idKelurahan
                                            }
                                        >
                                            Tampilkan
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* tps */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="rounded-md ">
                                <div className="space-y-6">
                                    <h1 className="font-bold text-2xl uppercase">
                                        TPS
                                    </h1>

                                    <ModalTps />
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">
                                                    INV001
                                                </TableCell>
                                                <TableCell>Paid</TableCell>
                                                <TableCell>
                                                    Credit Card
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    $250.00
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default index;

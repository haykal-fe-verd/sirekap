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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ModalTps from "./modal";
import Filter from "./filter";
import { cn } from "@/lib/utils";
import FormInput from "./form-input";

function index({ auth, tps, partai, show }) {
    //! states
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const [kabupaten, setKabupaten] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [idKabupaten, setIdKabupaten] = useState(
        urlParams.get("id_kabupaten") || ""
    );
    const [idKecamatan, setIdKecamatan] = useState(
        urlParams.get("id_kecamatan") || ""
    );
    const [idKelurahan, setIdKelurahan] = useState(
        urlParams.get("id_kelurahan") || ""
    );

    const [values, setValues] = useState({});

    //! events

    //! function
    const getKabupaten = async () => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/11.json`
        )
            .then((response) => response.json())
            .then((regencies) => setKabupaten(regencies));
    };

    const getKecamatan = async () => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${idKabupaten}.json`
        )
            .then((response) => response.json())
            .then((districts) => setKecamatan(districts));
    };

    const getKelurahan = async () => {
        await fetch(
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

            <div className="py-12  overflow-visible">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12  overflow-visible">
                    {/* filter */}
                    <Filter
                        kabupaten={kabupaten}
                        kecamatan={kecamatan}
                        kelurahan={kelurahan}
                        idKabupaten={idKabupaten}
                        idKecamatan={idKecamatan}
                        idKelurahan={idKelurahan}
                        setIdKabupaten={setIdKabupaten}
                        setIdKecamatan={setIdKecamatan}
                        setIdKelurahan={setIdKelurahan}
                        setValues={setValues}
                    />

                    {/* tps */}
                    {values.id_kabupaten &&
                    values.id_kecamatan &&
                    values.id_kelurahan &&
                    values.nama_kabupaten &&
                    values.nama_kecamatan &&
                    values.nama_kelurahan &&
                    show ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="rounded-md ">
                                    <div className="space-y-6">
                                        <h1 className="font-bold text-2xl uppercase">
                                            TPS
                                        </h1>

                                        <ModalTps values={values} />
                                        <FormInput tps={tps} partai={partai} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default index;

import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

function Filter({
    kabupaten,
    kecamatan,
    kelurahan,
    idKabupaten,
    idKecamatan,
    idKelurahan,
    setIdKabupaten,
    setIdKecamatan,
    setIdKelurahan,
    setValues,
}) {
    //! states
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    //!select
    const optionsKabupaten = kabupaten
        ?.map((item) => ({
            value: item.id,
            label: item.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    const optionsKecamatan = kecamatan
        ?.map((item) => ({
            value: item.id,
            label: item.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    const optionsKelurahan = kelurahan
        ?.map((item) => ({
            value: item.id,
            label: item.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    //! events
    const onClickTampilkan = async (e) => {
        e.preventDefault();
        await router.get(
            route(
                "input.suara.index",
                {
                    id_kabupaten: idKabupaten,
                    id_kecamatan: idKecamatan,
                    id_kelurahan: idKelurahan,
                },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            )
        );
    };

    const onClickReset = () => {
        setIdKabupaten("");
        setIdKecamatan("");
        setIdKelurahan("");
        setValues((values) => ({
            ...values,
            id_kabupaten: "",
            id_kecamatan: "",
            id_kelurahan: "",
        }));
        urlParams.delete("id_kabupaten");
        urlParams.delete("id_kecamatan");
        urlParams.delete("id_kelurahan");
        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
    };

    //! handlers
    const onChangeKabupaten = (e) => {
        setIdKabupaten(e.value);
        setIdKecamatan(null);
        setIdKelurahan(null);
        setValues((values) => ({
            ...values,
            id_kabupaten: e.value,
            nama_kabupaten: e.label,
        }));

        urlParams.set("id_kabupaten", e.value);
        urlParams.delete("id_kecamatan");
        urlParams.delete("id_kelurahan");

        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
    };

    const onChangeKecamatan = (e) => {
        setIdKecamatan(e.value);
        setIdKelurahan(null);

        setValues((values) => ({
            ...values,
            id_kecamatan: e.value,
            nama_kecamatan: e.label,
        }));

        urlParams.set("id_kecamatan", e.value);
        urlParams.delete("id_kelurahan");

        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
    };

    const onChangeKelurahan = (e) => {
        setIdKelurahan(e.value);
        setValues((values) => ({
            ...values,
            id_kelurahan: e.value,
            nama_kelurahan: e.label,
        }));

        urlParams.set("id_kelurahan", e.value);
        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?${urlParams.toString()}`
        );
    };

    useEffect(() => {
        const updateValuesAndUrlParams = () => {
            if (idKabupaten && optionsKabupaten) {
                const selectedKabupaten = optionsKabupaten.find(
                    (option) => option.value === idKabupaten
                );
                setValues((values) => ({
                    ...values,
                    id_kabupaten: idKabupaten,
                    nama_kabupaten: selectedKabupaten
                        ? selectedKabupaten.label
                        : null,
                }));
            }
            if (idKecamatan && optionsKecamatan) {
                const selectedKecamatan = optionsKecamatan.find(
                    (option) => option.value === idKecamatan
                );
                setValues((values) => ({
                    ...values,
                    id_kecamatan: idKecamatan,
                    nama_kecamatan: selectedKecamatan
                        ? selectedKecamatan.label
                        : null,
                }));
            }
            if (idKelurahan && optionsKelurahan) {
                const selectedKelurahan = optionsKelurahan.find(
                    (option) => option.value === idKelurahan
                );
                setValues((values) => ({
                    ...values,
                    id_kelurahan: idKelurahan,
                    nama_kelurahan: selectedKelurahan
                        ? selectedKelurahan.label
                        : null,
                }));
            }
        };

        updateValuesAndUrlParams();
    }, [
        idKabupaten,
        idKecamatan,
        idKelurahan,
        kelurahan,
        kabupaten,
        kecamatan,
    ]);

    return (
        <div className="bg-white  shadow-sm sm:rounded-lg  overflow-visible">
            <div className="p-6 text-gray-900  overflow-visible">
                <div className="rounded-md  overflow-visible">
                    <div className="space-y-6 overflow-visible">
                        <h1 className="font-bold text-2xl uppercase">Filter</h1>
                        <div>
                            <Label htmlFor="kabupaten">Kabupaten</Label>
                            <Select
                                options={optionsKabupaten}
                                onChange={onChangeKabupaten}
                                value={
                                    optionsKabupaten?.find(
                                        (option) => option.value === idKabupaten
                                    ) ?? null
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="kecamatan">Kecamatan</Label>
                            <Select
                                options={optionsKecamatan}
                                onChange={onChangeKecamatan}
                                value={
                                    optionsKecamatan?.find(
                                        (option) => option.value === idKecamatan
                                    ) ?? null
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="kelurahan">Kelurahan</Label>
                            <Select
                                options={optionsKelurahan}
                                onChange={onChangeKelurahan}
                                value={
                                    optionsKelurahan?.find(
                                        (option) => option.value === idKelurahan
                                    ) ?? null
                                }
                            />
                        </div>
                        <div className="w-full flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={onClickReset}
                            >
                                Reset
                            </Button>
                            <Button
                                type="button"
                                onClick={onClickTampilkan}
                                disabled={
                                    !idKabupaten || !idKecamatan || !idKelurahan
                                }
                            >
                                Tampilkan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;

import React, { useState } from "react";
import { router, Link } from "@inertiajs/react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function FormInput({ tps, partai }) {
    //! states
    const [perolehanSuara, setPerolehanSuara] = useState({});

    //! events
    const onSubmitBtn = () => {
        router.post(route("input.suara.tps.store"), perolehanSuara, {
            onSuccess: () => {
                setPerolehanSuara({});
            },
        });
    };

    const handleSuaraChange = (value, id, type, tpsId) => {
        if (type === "Partai") {
            setPerolehanSuara((prevPerolehanSuara) => ({
                ...prevPerolehanSuara,
                id_tps: tpsId,
                id_partai: {
                    ...prevPerolehanSuara.id_partai,
                    [id]: value,
                },
            }));
        }
        if (type === "Calon") {
            setPerolehanSuara((prevPerolehanSuara) => ({
                ...prevPerolehanSuara,
                id_tps: tpsId,
                id_calon: {
                    ...prevPerolehanSuara.id_calon,
                    [id]: value,
                },
            }));
        }
    };

    return (
        <div>
            <Accordion type="single" collapsible>
                {tps?.map((item, index) => (
                    <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger>
                            TPS-{item.nomor_tps}
                        </AccordionTrigger>
                        <AccordionContent className="bg-secondary rounded-md p-6">
                            <div className="space-y-6">
                                <ul className="list-disc list-inside">
                                    <h1 className="font-semibold uppercase">
                                        data pengguna hak pilih :
                                    </h1>
                                    <li className="">
                                        Jumlah Pengguna Hak Pilih dalam DPT :{" "}
                                        {item.dpt}
                                    </li>
                                    <li className="">
                                        Jumlah Pengguna Hak Pilih dalam DPTb :{" "}
                                        {item.dptb}
                                    </li>
                                    <li className="">
                                        Jumlah Pengguna Hak Pilih dalam DPK :{" "}
                                        {item.dpk}
                                    </li>
                                    <li className="">
                                        Jumlah Pengguna Hak Pilih{" "}
                                        {item.pengguna_hak_pilih}
                                    </li>
                                </ul>

                                <ul className="list-disc list-inside">
                                    <h1 className="font-semibold uppercase">
                                        jumlah suara sah dan tidak sah
                                    </h1>
                                    <li className="">
                                        Jumlah Seluruh Suara Sah :{" "}
                                        {item.suara_sah}
                                    </li>
                                    <li className="">
                                        Jumlah Seluruh Suara Tidak Sah :{" "}
                                        {item.suara_tidak_sah}
                                    </li>
                                    <li className="">
                                        Jumlah Seluruh Suara Sah dan Tidak Sah :{" "}
                                        {item.suara}
                                    </li>
                                </ul>

                                <div>
                                    {item.c1 && (
                                        <a
                                            href={`/storage/${item.c1}`}
                                            target="_blank"
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            lihat form C1.pdf
                                        </a>
                                    )}
                                </div>

                                <div className="rounded-md ">
                                    <div className="space-y-6">
                                        <h1 className="font-semibold uppercase">
                                            Perolehan Suara
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
                                                            key={partaiIndex}
                                                        >
                                                            <TableRow className="bg-primary/10">
                                                                <TableCell className="border text-center p-2">
                                                                    {
                                                                        partaiItem.nomor
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="border p-2">
                                                                    {
                                                                        partaiItem.nama
                                                                    }
                                                                </TableCell>
                                                                <TableCell className="border p-2">
                                                                    <Input
                                                                        type="number"
                                                                        defaultValue={
                                                                            item.pengambilan.find(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.chooseable_type ===
                                                                                        "App\\Models\\Partai" &&
                                                                                    i.chooseable_id ===
                                                                                        partaiItem.id.toString()
                                                                            )
                                                                                ?.suara ||
                                                                            0
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleSuaraChange(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                partaiItem.id,
                                                                                "Partai",
                                                                                item.id
                                                                            )
                                                                        }
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
                                                                        <TableCell className="border p-2"></TableCell>
                                                                        <TableCell className="border p-2">{`${calonItem.nomor}. ${calonItem.nama}`}</TableCell>
                                                                        <TableCell className="border p-2">
                                                                            <Input
                                                                                type="number"
                                                                                defaultValue={
                                                                                    item.pengambilan.find(
                                                                                        (
                                                                                            i
                                                                                        ) =>
                                                                                            i.chooseable_type ===
                                                                                                "App\\Models\\Calon" &&
                                                                                            i.chooseable_id ===
                                                                                                calonItem.id.toString()
                                                                                    )
                                                                                        ?.suara ||
                                                                                    0
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleSuaraChange(
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                        calonItem.id,
                                                                                        "Calon",
                                                                                        item.id
                                                                                    )
                                                                                }
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

                                        <Button
                                            type="button"
                                            onClick={() => onSubmitBtn(item.id)}
                                        >
                                            Simpan
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default FormInput;

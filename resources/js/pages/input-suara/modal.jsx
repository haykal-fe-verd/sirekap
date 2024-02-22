import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";

function ModalTps({ values }) {
    //! state
    const [data, setData] = useState({
        id_kabupaten: values.id_kabupaten,
        id_kecamatan: values.id_kecamatan,
        id_kelurahan: values.id_kelurahan,
        nama_kabupaten: values.nama_kabupaten,
        nama_kecamatan: values.nama_kecamatan,
        nama_kelurahan: values.nama_kelurahan,
    });

    //! events
    const onSubmit = (e) => {
        e.preventDefault();

        router.post(route("tps.store"), data);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah TPS</Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Tambah TPS</DialogTitle>
                    <DialogDescription>
                        Pastikan Nomor TPS nya sesuai dan tidak double.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div className="">
                            <Label htmlFor="nomor_tps" className="text-right">
                                Nomor TPS
                            </Label>
                            <Input
                                type="number"
                                id="nomor_tps"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        nomor_tps: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Separator />

                        <h1 className="font-semibold">
                            Data Pengguna Hak Pilih
                        </h1>

                        <div>
                            <Label htmlFor="dpt" className="text-right">
                                Jumlah Pengguna Hak Pilih DPT
                            </Label>
                            <Input
                                type="number"
                                id="dpt"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        dpt: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="dptb" className="text-right">
                                Jumlah Pengguna Hak Pilih DPTb
                            </Label>
                            <Input
                                type="number"
                                id="dptb"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        dptb: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="dpk" className="text-right">
                                Jumlah Pengguna Hak Pilih DPTK
                            </Label>
                            <Input
                                type="number"
                                id="dpk"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        dpk: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <Separator />

                        <h1 className="font-semibold">
                            Jumlah Suara Sah dan Tidak Sah
                        </h1>

                        <div>
                            <Label htmlFor="suara_sah" className="text-right">
                                Jumlah Suara Sah
                            </Label>
                            <Input
                                type="number"
                                id="suara_sah"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        suara_sah: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="suara_tidak_sah"
                                className="text-right"
                            >
                                Jumlah Suara Tidak Sah
                            </Label>
                            <Input
                                type="number"
                                id="suara_tidak_sah"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        suara_tidak_sah: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <Separator />

                        <h1 className="font-semibold">C1 Plano</h1>
                        <Input
                            type="file"
                            id="c1"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    c1: e.target.files[0],
                                })
                            }
                        />

                        <Button type="submit">Tambah</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ModalTps;

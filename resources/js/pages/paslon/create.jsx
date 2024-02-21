import React, { useState } from "react";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { PlusCircleIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";

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
import InputError from "@/components/input-error";
import { Separator } from "@/components/ui/separator";

function CreateModal() {
    const { errors } = usePage().props;

    //! state
    const [values, setValues] = useState({});
    const [additionalCandidates, setAdditionalCandidates] = useState([]);
    const [open, setOpen] = useState(false);

    //! events
    function handleCandidateChange(index, field, value) {
        const newCandidates = [...additionalCandidates];
        newCandidates[index][field] = value;
        setAdditionalCandidates(newCandidates);
    }

    function handleAddCandidate() {
        setAdditionalCandidates([
            ...additionalCandidates,
            { nomor: "", nama: "" },
        ]);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const payload = {
            ...values,
            calon: additionalCandidates,
        };

        router.post(route("paslon.store"), payload, {
            onSuccess: () => {
                setValues({});
                setAdditionalCandidates([]);
                setOpen(false);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Tambah Partai & Calon</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <DialogHeader>
                        <DialogTitle>Tambah Partai & Calon</DialogTitle>
                        <DialogDescription>
                            Pastikan Nomor Urut dan Nama nya sesuai.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 mt-5">
                        <div className="">
                            <Label htmlFor="nomor" className="text-right">
                                Nomor Urut Partai
                            </Label>

                            <Input
                                id="nomor"
                                className="col-span-3"
                                onChange={(e) => {
                                    setValues((values) => ({
                                        ...values,
                                        nomor: e.target.value,
                                    }));
                                }}
                            />
                            <InputError message={errors.nomor} />
                        </div>

                        <div className="">
                            <Label htmlFor="nama" className="text-right">
                                Nama Partai
                            </Label>
                            <Input
                                id="nama"
                                className="col-span-3"
                                onChange={(e) => {
                                    setValues((values) => ({
                                        ...values,
                                        nama: e.target.value,
                                    }));
                                }}
                            />
                            <InputError message={errors.nama} />
                        </div>

                        <div className="">
                            <Label htmlFor="logo" className="text-right">
                                Logo Partai
                            </Label>
                            <Input
                                type="file"
                                id="logo"
                                className="col-span-3"
                                onChange={(e) => {
                                    setValues((values) => ({
                                        ...values,
                                        logo: e.target.files[0],
                                    }));
                                }}
                            />
                        </div>
                    </div>

                    <Separator className="my-5" />

                    <div>
                        <Button
                            type="button"
                            className="rounded-full"
                            onClick={handleAddCandidate}
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                        </Button>

                        {additionalCandidates.map((candidate, index) => (
                            <div key={index} className="my-5">
                                <div className="bg-primary rounded-full w-5 h-5 text-sm text-center flex items-center justify-center text-white p-2">
                                    <span>{index + 1}</span>
                                </div>
                                <div>
                                    <Label>Nomor Calon</Label>
                                    <Input
                                        type="number"
                                        value={candidate.nomor}
                                        onChange={(e) =>
                                            handleCandidateChange(
                                                index,
                                                "nomor",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <Label>Nama Calon</Label>
                                    <Input
                                        type="text"
                                        value={candidate.nama}
                                        onChange={(e) =>
                                            handleCandidateChange(
                                                index,
                                                "nama",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}

                        <Separator className="my-5" />
                    </div>

                    <Button type="submit" className="w-full my-5">
                        Simpan
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateModal;

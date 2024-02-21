import React from "react";
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

function ModalTps({ id_kabupaten, id_kecamatan, id_keluarahan }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah TPS</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah TPS</DialogTitle>
                    <DialogDescription>
                        Pastikan Nomor TPS nya sesuai dan tidak double.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nomor_tps" className="text-right">
                            Nomor TPS
                        </Label>
                        <Input
                            type="number"
                            id="nomor_tps"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ModalTps;

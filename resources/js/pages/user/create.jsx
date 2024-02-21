import React from "react";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

function create({ auth }) {
    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route("user.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah User
                </h2>
            }
        >
            <Head title="Tambah User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-5">
                            <Button
                                asChild
                                variant="link"
                                className="inline-flex gap-3 p-0"
                            >
                                <Link href={route("user.index")}>
                                    <ArrowLeft className="h-5 w-5" />
                                    <span>Kembali</span>
                                </Link>
                            </Button>
                            <form onSubmit={onSubmit} className="space-y-5">
                                <div>
                                    <Label htmlFor="name">
                                        Nama
                                        <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="mt-2"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div>
                                    <Label htmlFor="email">
                                        Email
                                        <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-2"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div>
                                    <Label htmlFor="role">
                                        Role
                                        <span className="text-rose-500">*</span>
                                    </Label>
                                    <Select
                                        defaultValue={data.role}
                                        onValueChange={(e) =>
                                            setData("role", e)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>
                                            <SelectItem value="user">
                                                User
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <InputError message={errors.role} />
                                </div>
                                <div>
                                    <Label htmlFor="password">
                                        Password
                                        <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="mt-2"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <Button type="submit">Simpan</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default create;

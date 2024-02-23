<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartaiResource;
use App\Models\Partai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaslonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partai = Partai::orderBy('nomor', 'asc')->get();
        $data = $partai->load('calon');

        return Inertia::render('paslon/index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'nomor' => 'required',
            'logo' => 'mimes:jpg,png|max:2048|nullable',
        ]);

        $partai = Partai::create($request->all());
        if ($request->file('logo')) {
            $path = $request->file('logo')->store('partai', 'public');
            $partai->update([
                'logo' => $path
            ]);
        }

        if ($request->calon) {
            foreach ($request->calon as $key) {
                $partai->calon()->create([
                    'nama' => $key['nama'],
                    'nomor' => $key['nomor'],
                ]);
            }
        }


        return redirect()->route('paslon.index')->with('success', 'Partai dan Calon berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

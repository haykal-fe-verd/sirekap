<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\KotakSuara;
use App\Models\Partai;
use App\Models\Tps;
use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class InputSuaraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tps = null;
        if ($request->query('id_kabupaten') && $request->query('id_kecamatan') && $request->query('id_kelurahan')) {
            $tps = Tps::where('id_kabupaten', $request->query('id_kabupaten'))
                ->where('id_kecamatan', $request->query('id_kecamatan'))
                ->where('id_kelurahan', $request->query('id_kelurahan'))
                ->with('pengambilan')->get();
        }

        $partai = Partai::with('calon')->get();
        $calon = Calon::all();


        return Inertia::render('input-suara/index', compact('partai', 'calon', 'tps'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'c1' => 'mimes:pdf|max:2048',
            'id_kabupaten' => 'required',
            'nama_kabupaten' => 'required',
            'id_kecamatan' => 'required',
            'nama_kecamatan' => 'required',
            'id_kelurahan' => 'required',
            'nama_kelurahan' => 'required',
            'nomor_tps' => 'required',
        ]);

        $where = [
            'id_kabupaten' => $request->input('id_kabupaten'),
            'id_kabupaten' => $request->input('id_kabupaten'),
            'id_kelurahan' => $request->input('id_kelurahan'),
            'nomor_tps' => $request->input('nomor_tps'),
        ];

        $field = [
            'id_kabupaten' => $request->input('id_kabupaten'),
            'nama_kabupaten' => $request->input('nama_kabupaten'),
            'id_kecamatan' => $request->input('id_kecamatan'),
            'nama_kecamatan' => $request->input('nama_kecamatan'),
            'id_kelurahan' => $request->input('id_kelurahan'),
            'nama_kelurahan' => $request->input('nama_kelurahan'),
            'nomor_tps' => $request->input('nomor_tps'),
        ];

        $tps = Tps::updateOrCreate($where, $field);

        // insert file
        if ($request->hasFile('c1')) {
            if ($tps->c1) {
                Storage::delete($tps->c1);
            }
            $tps->c1 = $request->file('c1')->store('public/c1');
            $tps->save();
        }

        // polimorphic
        if ($request->has('id_partai')) {
            foreach ($request->id_partai as $id_partai) {
                KotakSuara::updateOrCreate([
                    'id_tps' => $tps->id,
                    'chooseable_type' => Partai::class,
                    'chooseable_id' => $id_partai,
                ]);
            }
        }

        if ($request->has('id_calon')) {
            foreach ($request->id_calon as $id_calon) {
                KotakSuara::updateOrCreate([
                    'id_tps' => $tps->id,
                    'chooseable_type' => Calon::class,
                    'chooseable_id' => $id_calon,
                ]);
            }
        }
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

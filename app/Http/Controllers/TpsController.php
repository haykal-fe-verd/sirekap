<?php

namespace App\Http\Controllers;

use App\Models\Tps;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TpsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'dpt' => (int)$request->input('dpt'),
            'dptb' => (int)$request->input('dptb'),
            'dpk' => (int)$request->input('dpk'),
            'pengguna_hak_pilih' => (int)$request->input('dpt') + (int)$request->input('dptb') + (int)$request->input('dpk'),
            'suara_sah' => (int)$request->input('suara_sah'),
            'suara_tidak_sah' => (int)$request->input('suara_tidak_sah'),
            'suara' => (int)$request->input('suara_sah') + (int)$request->input('suara_tidak_sah'),
        ];

        $tps = Tps::updateOrCreate($where, $field);

        if ($request->hasFile('c1')) {
            if ($tps->c1) {
                Storage::delete($tps->c1);
            }
            $tps->c1 = $request->file('c1')->store('public/c1');
            $tps->save();
        }

        if ($tps->wasRecentlyCreated) {
            return redirect()->back()->with('success', 'TPS berhasil di tambahkan.');
        } else {
            return redirect()->back()->with('success', 'TPS berhasil di perbaharui.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tps $tps)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tps $tps)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tps $tps)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tps $tps)
    {
        //
    }
}

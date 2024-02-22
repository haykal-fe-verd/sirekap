<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartaiResource;
use App\Models\Calon;
use App\Models\KotakSuara;
use App\Models\Partai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalSuaraRamadhana = Calon::where('id', 2)->withSum('suara', 'suara')->first();
        $totalSuaraIrmawan = Calon::where('id', 1)->withSum('suara', 'suara')->first();
        $top10partai = Partai::withSum('suara', 'suara')->orderBy('suara_sum_suara', 'desc')->limit(10)->get();
        $top10calon = Calon::with('partai')->withSum('suara', 'suara')->orderBy('suara_sum_suara', 'desc')->limit(10)->get();

        $totalSuaraCalon = 0;
        $totalSuaraPartai = 0;
        $totalSuaraDapilPkb = 0;

        $calon = Calon::withSum('suara', 'suara')->get();
        foreach ($calon as $c) {
            $totalSuaraCalon += $c->suara_sum_suara;
        }
        $partai = Partai::withSum('suara', 'suara')->get();
        foreach ($partai as $p) {
            $totalSuaraPartai += $p->suara_sum_suara;
        }

        $dapilPkb = Partai::where('id', 1)->with('calon')->first();
        $dapilPkb = new PartaiResource($dapilPkb);

        return Inertia::render('dashboard', compact(
            'top10partai',
            'top10calon',
            'totalSuaraRamadhana',
            'totalSuaraIrmawan',
            'totalSuaraCalon',
            'totalSuaraPartai',
            'dapilPkb'
        ));
    }
    public function home()
    {
        $totalSuaraRamadhana = Calon::where('id', 2)->withSum('suara', 'suara')->first();
        $totalSuaraIrmawan = Calon::where('id', 1)->withSum('suara', 'suara')->first();
        $top10partai = Partai::withSum('suara', 'suara')->orderBy('suara_sum_suara', 'desc')->limit(10)->get();
        $top10calon = Calon::with('partai')->withSum('suara', 'suara')->orderBy('suara_sum_suara', 'desc')->limit(10)->get();

        $totalSuaraCalon = 0;
        $totalSuaraPartai = 0;
        $totalSuaraDapilPkb = 0;

        $calon = Calon::withSum('suara', 'suara')->get();
        foreach ($calon as $c) {
            $totalSuaraCalon += $c->suara_sum_suara;
        }
        $partai = Partai::withSum('suara', 'suara')->get();
        foreach ($partai as $p) {
            $totalSuaraPartai += $p->suara_sum_suara;
        }

        $dapilPkb = Partai::where('id', 1)->with('calon')->first();
        $dapilPkb = new PartaiResource($dapilPkb);

        return Inertia::render('welcome', compact(
            'top10partai',
            'top10calon',
            'totalSuaraRamadhana',
            'totalSuaraIrmawan',
            'totalSuaraCalon',
            'totalSuaraPartai',
            'dapilPkb'
        ));
    }
}

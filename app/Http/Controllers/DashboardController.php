<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use App\Models\Partai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $top10partai = Partai::withSum('suara', 'suara')->orderBy('suara_sum_suara', 'desc')->limit(10)->get();
        $top10calon = Calon::with('partai')->withSum('suara', 'suara')->orderBy('suara_sum_suara', 'desc')->limit(10)->get();
        return Inertia::render('dashboard', compact('top10partai', 'top10calon'));
    }
}

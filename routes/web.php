<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InputSuaraController;
use App\Http\Controllers\PaslonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TpsController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // user
    Route::get('user', [UserController::class, 'index'])->name('user.index');
    Route::get('user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('user', [UserController::class, 'store'])->name('user.store');
    Route::get('user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::put('user/{id}', [UserController::class, 'update'])->name('user.update');
    Route::delete('user/{id}', [UserController::class, 'destroy'])->name('user.destroy');

    // partai dan calon
    Route::get('paslon', [PaslonController::class, 'index'])->name('paslon.index');
    Route::post('paslon', [PaslonController::class, 'store'])->name('paslon.store');

    // tps
    Route::post('tps', [TpsController::class, 'store'])->name('tps.store');

    // input suara
    Route::get('input-suara', [InputSuaraController::class, 'index'])->name('input.suara.index');
    Route::post('input-suara', [InputSuaraController::class, 'store'])->name('input.suara.store');
    Route::post('input-suara-tps', [InputSuaraController::class, 'storeTps'])->name('input.suara.tps.store');
});

require __DIR__ . '/auth.php';

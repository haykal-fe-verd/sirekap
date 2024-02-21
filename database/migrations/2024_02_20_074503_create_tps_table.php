<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_tps', function (Blueprint $table) {
            $table->id();
            $table->string('id_kabupaten');
            $table->string('nama_kabupaten');
            $table->string('id_kecamatan');
            $table->string('nama_kecamatan');
            $table->string('id_kelurahan');
            $table->string('nama_kelurahan');
            $table->string('nomor_tps');
            $table->integer('dpt')->default(0);
            $table->integer('dptb')->default(0);
            $table->integer('dpk')->default(0);
            $table->integer('pengguna_hak_pilih')->default(0);
            $table->integer('suara_sah')->default(0);
            $table->integer('suara_tidak_sah')->default(0);
            $table->integer('suara')->default(0);
            $table->string('c1')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_tps');
    }
};

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
        Schema::create('tb_kotak_suara', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_tps')->references('id')->on('tb_tps')->onDelete('cascade');
            $table->string('chooseable_type');
            $table->string('chooseable_id');
            $table->index(['chooseable_type', 'chooseable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kotak_suara');
    }
};

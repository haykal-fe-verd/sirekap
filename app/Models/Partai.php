<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partai extends Model
{
    use HasFactory;

    protected $table = 'tb_partai';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'nama',
        'nomor',
        'logo',
    ];

    //! relasi
    public function calon()
    {
        return $this->hasMany(Calon::class, 'id_partai', 'id');
    }

    public function suara()
    {
        return $this->morphMany(KotakSuara::class, "chooseable", 'chooseable_type', 'chooseable_id');
    }
}

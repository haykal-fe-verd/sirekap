<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tps extends Model
{
    use HasFactory;

    protected $table = 'tb_tps';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id_kabupaten',
        'nama_kabupaten',
        'id_kecamatan',
        'nama_kecamatan',
        'id_kelurahan',
        'nama_kelurahan',
        'nomor_tps',
        'dpt',
        'dptb',
        'dpk',
        'pengguna_hak_pilih',
        'suara_sah',
        'suara_tidak_sah',
        'suara',
        'c1'
    ];

    //! relasi
    public function pengambilan()
    {
        return $this->hasMany(KotakSuara::class, 'id_tps', 'id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calon extends Model
{
    use HasFactory;

    protected $table = 'tb_calon';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id_partai',
        'nama',
        'nomor',
    ];

    //! relasi
    public function partai()
    {
        return $this->belongsTo(Partai::class, 'id_partai', 'id');
    }

    public function suara()
    {
        return $this->morphMany(KotakSuara::class, "chooseable", 'chooseable_type', 'chooseable_id');
    }
}

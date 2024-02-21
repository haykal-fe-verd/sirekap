<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KotakSuara extends Model
{
    use HasFactory;

    protected $table = 'tb_kotak_suara';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id_tps',
        'chooseable_type',
        'chooseable_id',
        'suara'
    ];

    //! relasi
    public function chooseable()
    {
        return $this->morphTo();
    }

    public function tps()
    {
        return $this->belongsTo(Tps::class, 'id_tps', 'id');
    }
}

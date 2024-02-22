<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartaiResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = null;


    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'nomor' => $this->nomor,
            'calon' => CalonResource::collection($this->calon),
            'suara' => $this->withSum('suara', 'suara')->where('id', $this->id)->first()->suara_sum_suara
        ];
    }
}

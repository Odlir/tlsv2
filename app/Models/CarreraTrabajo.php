<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarreraTrabajo extends Model
{
    use HasFactory;

    protected $table = 'carrera_trabajo';
    public function carrera()
    {
        return $this->belongsTo(Carrera::class);
    }
}

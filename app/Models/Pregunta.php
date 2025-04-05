<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
    public function carrera()
    {
        return $this->belongsTo(Carrera::class);
    }
}

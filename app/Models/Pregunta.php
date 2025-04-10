<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{


    protected $table = 'preguntas';

    protected $fillable = [
        'areas_id',
        'nombre',
        'estado'
    ];
    public function carrera()
    {
        return $this->belongsTo(Carrera::class);
    }

    public function area()
    {
        return $this->belongsTo(Area::class, 'areas_id');
    }
}

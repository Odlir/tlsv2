<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\MyTrait;

class EncuestaPersona extends Model
{
    protected $table = "encuesta_personas";

    use MyTrait;

    protected $fillable = [
        'estado',
        'persona_id',
        'encuesta_id',
        'completada',
        'fecha_completada',
        'insert_user_id',
        'edit_user_id'
    ];

    public function persona()
    {
        return $this->belongsTo('App\Models\Persona');
    }

    public function encuesta() {
        return $this->belongsTo('App\Models\Encuesta');
    }

    public function respuestas()
    {
        return $this->hasMany(EncuestaRespuesta::class);
    }

    public function insert()
    {
        return $this->belongsTo('App\User', 'insert_user_id');
    }

    public function edit()
    {
        return $this->belongsTo('App\User', 'edit_user_id');
    }
}

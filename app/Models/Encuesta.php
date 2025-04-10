<?php

namespace App\Models;

use App\Traits\MyTrait;
use Illuminate\Database\Eloquent\Model;

class Encuesta extends Model
{
    use MyTrait;

    protected $fillable = [
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'seccion',
        'empresa_sucursal_id',
        'insert_user_id',
        'edit_user_id'
    ];

    protected $appends = ['status', 'avance'];

    public function getStatusAttribute()
    {
        $currentDate = date('Y-m-d');

        if($this->estado === '0') {
            return 'Inactivo';
        }

        if ($currentDate < $this->fecha_inicio) {
            return 'Pendiente';
        } elseif ($this->fecha_fin >= $this->fecha_inicio && $currentDate <= $this->fecha_fin) {
            return 'Activo';
        } elseif ($currentDate > $this->fecha_fin) {
            return 'Terminado';
        }

        return 'Pendiente';
    }

    public function getAvanceAttribute()
    {
        try {
            return ($this->personas()->wherePivot('completada', '1')->count() / $this->personas()->count()) * 100;
        } catch (\Throwable $th) {
            return 0;
        }
    }

    public function empresa()
    {
        return $this->belongsTo('App\Models\EmpresaSucursal', 'empresa_sucursal_id');
    }

    public function insert()
    {
        return $this->belongsTo('App\User', 'insert_user_id');
    }

    public function edit()
    {
        return $this->belongsTo('App\User', 'edit_user_id');
    }

    public function personas()
    {
        return $this->belongsToMany('App\Models\Persona', 'encuesta_personas')->withPivot(["id", "estado", "completada"]);
    }
}

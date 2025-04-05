<?php

namespace App\Models;

use App\Traits\MyTrait;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use MyTrait;

    protected $fillable = [
        'razon_social',
        'contacto',
        'email',
        'telefono',
        'ubigeo',
        'sede',
        'codigo',
        'nivel',
        'gestion',
        'gestion_departamento',
        'insert_user_id',
        'edit_user_id'
    ];

    protected $appends = ['ubigeo_completo'];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            foreach (['razon_social', 'contacto'] as $campo) {
                $valor = $model->sinTilde($campo, $model->$campo);
                $valor = $model->setUpperCase($campo, $valor);
                $model->$campo = $valor;
            }
        });
    }

    public function getUbigeoCompletoAttribute()
    {
        if ($this->distrito) {
            return $this->distrito->nombre . " - " .
                $this->distrito->provincia->nombre . " - " .
                $this->distrito->provincia->departamento->nombre;
        }
        return '';
    }

    public function distrito()
    {
        return $this->belongsTo('App\Models\Distrito', 'ubigeo', 'id');
    }

    public function sucursales()
    {
        return $this->hasMany('App\Models\EmpresaSucursal');
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

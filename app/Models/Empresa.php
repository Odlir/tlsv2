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
            $model->razon_social = $model->sinTilde('razon_social', $model->razon_social);
            $model->contacto = $model->sinTilde('contacto', $model->contacto);
            $model->email = $model->sinTilde('email', $model->email);
            $model->telefono = $model->sinTilde('telefono', $model->telefono);
            $model->sede = $model->sinTilde('sede', $model->sede);
            $model->codigo = $model->sinTilde('codigo', $model->codigo);
            $model->nivel = $model->sinTilde('nivel', $model->nivel);
            $model->gestion = $model->sinTilde('gestion', $model->gestion);
            $model->gestion_departamento = $model->sinTilde('gestion_departamento', $model->gestion_departamento);
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

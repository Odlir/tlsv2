<?php

namespace App\Models;

use App\Traits\MyTrait;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use MyTrait;

    protected $table = "reportes";

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    public function insert()
    {
        return $this->belongsTo('App\User', 'insert_user_id');
    }

    public function edit()
    {
        return $this->belongsTo('App\User', 'edit_user_id');
    }
}

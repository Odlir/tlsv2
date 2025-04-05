<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\EmpresaSucursalFilterTrait;

class EmpresaSucursal extends Model
{
    use EmpresaSucursalFilterTrait;

    protected $fillable = [
        'empresa_id', 'nombre', 'estado' // y los campos que necesites
    ];

    // Aquí irían relaciones tipo:
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function insert()
    {
        return $this->belongsTo(User::class, 'insert_user_id');
    }

    public function edit()
    {
        return $this->belongsTo(User::class, 'edit_user_id');
    }
}

<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait EmpresaSucursalFilterTrait
{
    public function scopeFilterByEmpresaId(Builder $query, $empresaId)
    {
        return $query->where('empresa_id', $empresaId);
    }

    public function scopeSearch(Builder $query, $searchValue)
    {
        return $query->where(function ($q) use ($searchValue) {
            $q->where('id', 'LIKE', "%{$searchValue}%")
                ->orWhere('nombre', 'LIKE', "%{$searchValue}%");
        });
    }

    public function scopeActivas(Builder $query)
    {
        return $query->where('estado', '1');
    }
}

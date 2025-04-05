<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonaController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate') ?? 10;
        $offset = $request->input('offset') * $paginate;
        $searchValue = $request->input('search');

        $dataQuery = Persona::where('estado', '1')
            ->where('rol_id', '2')
            ->where(function ($query) use ($searchValue) {
                $query->where("id", "LIKE", "%$searchValue%")
                    ->orWhere('nombres', "LIKE", "%$searchValue%")
                    ->orWhere('apellido_materno', "LIKE", "%$searchValue%")
                    ->orWhere('apellido_paterno', "LIKE", "%$searchValue%")
                    ->orWhere('sexo', "LIKE", "%$searchValue%")
                    ->orWhere('correo', "LIKE", "%$searchValue%");
            });

        $totalRecords = $dataQuery->count();


        $data = $dataQuery
            ->skip($offset)
            ->take($paginate)
            ->orderBy('id', 'DESC')
            ->get();

        return Inertia::render('Personas/personas', [
            'rows' => $data,
            'totalRecords' => $totalRecords,
            'totalPages' => ceil($totalRecords / $paginate),
        ]);
    }
}


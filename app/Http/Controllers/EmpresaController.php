<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmpresaController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate') ?? 10;

        $offset = $request->input('offset') * $paginate;

        $searchValue = $request->input('search');

        $dataQuery = Empresa::where('estado', '1')
            ->where(function ($query) use ($searchValue) {
                $query->where('id', "LIKE", "%$searchValue%")
                    ->orWhere('razon_social', "LIKE", "%$searchValue%")
                    ->orWhere('contacto', "LIKE", "%$searchValue%")
                    ->orWhere('email', "LIKE", "%$searchValue%")
                    ->orWhere('telefono', "LIKE", "%$searchValue%");
            });

        $totalRecords = $dataQuery->count();

        $data = $dataQuery
            ->skip($offset)
            ->take($paginate)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('colegios/colegios', [
            'empresas' => $data,
            'totalRecords' => $totalRecords,
            'totalPages' => ceil($totalRecords / $paginate),
        ]);
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Reporte;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate') ?? 10;
        $offset = $request->input('offset') * $paginate;
        $searchValue = $request->input('search');

        $dataQuery = Reporte::
            where(function ($query) use ($searchValue) {
                $query->where("id", "LIKE", "%$searchValue%");
            });

        $totalRecords = $dataQuery->count();

        $data = $dataQuery
            ->skip($offset)
            ->take($paginate)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('reportes/reportes', [
            'rows' => $data,
            'totalRecords' => $totalRecords,
            'totalPages' => ceil($totalRecords / $paginate),
        ]);
    }

    public function reporte_anual(Request $request)
    {
        $paginate = $request->input('paginate') ?? 10;
        $offset = $request->input('offset') * $paginate;
        $searchValue = $request->input('search');

        $dataQuery = Reporte::
        where(function ($query) use ($searchValue) {
            $query->where("id", "LIKE", "%$searchValue%");
        });

        $totalRecords = $dataQuery->count();

        $data = $dataQuery
            ->skip($offset)
            ->take($paginate)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('anual/anual', [
            'rows' => $data,
            'totalRecords' => $totalRecords,
            'totalPages' => ceil($totalRecords / $paginate),
        ]);
    }
}

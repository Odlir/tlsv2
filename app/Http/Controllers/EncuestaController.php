<?php

namespace App\Http\Controllers;

use App\Models\Encuesta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EncuestaController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate') ?? 10;

        $offset = $request->input('offset') * $paginate;

        $searchValue = $request->input('search');

        $dataQuery = Encuesta::with('empresa')
            ->where(function ($query) use ($searchValue) {
                $query->where("id", "LIKE", "%$searchValue%")
                    ->orwhereHas('empresa', function ($q) use ($searchValue) {
                        $q->where("nombre", "LIKE", "%$searchValue%");
                    });
            });

        $totalRecords = $dataQuery->count();

        $data = $dataQuery
            ->skip($offset)
            ->take($paginate)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('encuestas/encuestas', [
            'encuestas' => $data,
            'totalRecords' => $totalRecords,
            'totalPages' => ceil($totalRecords / $paginate),
        ]);
    }


    public function store(Request $request)
    {
        // Validación de los datos
        $validated = $request->validate([
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'seccion' => 'nullable|string',

        ]);

  /*      if ($request->hasFile('excelFile')) {
            $file = $request->file('excelFile');

            $spreadsheet = IOFactory::load($file->getPathname());
            $sheet = $spreadsheet->getActiveSheet();

            $rows = [];
            foreach ($sheet->getRowIterator(2) as $row) {
                $rowData = [];
                $cellIterator = $row->getCellIterator('A', 'H');
                $cellIterator->setIterateOnlyExistingCells(false);
                foreach ($cellIterator as $cell) {
                    $rowData[] = $cell->getFormattedValue();
                }
                $rows[] = $rowData;
            }

            dd($rows); // Ver los datos de las filas
        }*/
        $encuesta = new Encuesta();
        $encuesta->fecha_inicio = $validated['fecha_inicio'];
        $encuesta->fecha_fin = $validated['fecha_fin'];
        $encuesta->seccion = $validated['seccion'] ?? null;
        $encuesta->empresa_sucursal_id = 1;
        $encuesta->insert_user_id = auth()->id();
        $encuesta->estado = 1;
        $encuesta->save();

        return response()->json($encuesta, 201);
    }


}

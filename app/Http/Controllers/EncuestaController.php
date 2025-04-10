<?php

namespace App\Http\Controllers;
use App\Models\Persona;
use App\Models\EncuestaPersona;
use PhpOffice\PhpSpreadsheet\IOFactory;
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

        $encuesta = new Encuesta();
        $encuesta->fecha_inicio = $request->fecha_inicio;
        $encuesta->fecha_fin = $request->fecha_fin;
        $encuesta->seccion = $request->seccion ?? null;
        $encuesta->empresa_sucursal_id = 1;
        $encuesta->insert_user_id = auth()->id();
        $encuesta->estado = 1;
        $encuesta->save();

      if ($request->hasFile('excelFile')) {
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

          foreach ($rows as $row) {
              $persona = new Persona();
              $persona->apellido_paterno = $row[1];
              $persona->apellido_materno = $row[2];
              $persona->nombres = $row[0];
              $persona->sexo = strtoupper($row[3]);
              $persona->email = $row[5];
              $persona->correo = $row[5];
              $persona->dni = $row[6];
              $persona->celular = $row[7];
              $persona->anio = date('Y');
              $persona->rol_id = 2;
              $persona->insert_user_id = auth()->id();
              $persona->estado = '1';
              $persona->save();

              $encuestaPersona = new EncuestaPersona();
              $encuestaPersona->persona_id = $persona->id;
              $encuestaPersona->encuesta_id = $encuesta->id;
              $encuestaPersona->completada = 0;
              $encuestaPersona->fecha_completada = null;
              $encuestaPersona->insert_user_id = auth()->id();
              $encuestaPersona->estado = 1;
              $encuestaPersona->save();
          }
        }



     return response()->json($encuesta, 201);
    }


    public function getEncuestas(Request $request)
    {
        // Validamos que la empresaSucursalId esté presente
        $request->validate([
            'empresaSucursalId' => 'required|exists:empresa_sucursals,id',
        ]);

        // Obtenemos las encuestas relacionadas con la empresaSucursal
        $encuestas = Encuesta::where('empresa_sucursal_id', $request->empresaSucursalId)->get();

        // Devolver las encuestas como respuesta JSON
        return response()->json($encuestas);
    }

    public function getEstatusEncuesta(Request $request)
    {
        $encuestaId = $request->query('encuestaId');

        $encuestaPersonas = EncuestaPersona::with(['persona', 'encuesta'])
            ->where('encuesta_id', $encuestaId)
            ->get()
            ->map(function ($encuestaPersona) {
                return [
                    'encuesta_nombre' => $encuestaPersona->encuesta->seccion, // O el campo adecuado
                    'estado' => $encuestaPersona->estado,
                    'encuesta_id' => $encuestaPersona->encuesta_id,
                    'persona_id' => $encuestaPersona->persona_id,
                    'completada' => $encuestaPersona->completada,
                    'fecha_completada' => $encuestaPersona->fecha_completada,
                    'persona' => [
                        'nombre_completo' => $encuestaPersona->persona->nombre_completo, // Suponiendo que tienes un atributo o método 'nombre_completo' en tu modelo Persona
                        'dni' => $encuestaPersona->persona->dni,
                        'correo' => $encuestaPersona->persona->correo,
                        'celular' => $encuestaPersona->persona->celular
                    ]
                ];
            });

        return response()->json($encuestaPersonas);
    }


}

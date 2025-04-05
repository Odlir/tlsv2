<?php

namespace App\Http\Controllers;

use App\Models\Carrera;
use App\Models\EmpresaSucursal;
use App\Models\Encuesta;
use App\Models\EncuestaPersona;
use App\Models\EncuestaRespuesta;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EncuestaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginate = $request->input('paginate');

        $offset = $request->input('offset') * $paginate;

        $searchValue = $request->input('search');

        $data = Encuesta::with('empresa')
            ->where(function ($query) use ($searchValue) {
                $query->where("id", "LIKE", "%$searchValue%")
                    ->orwhereHas('empresa', function ($q) use ($searchValue) {
                        $q->where("nombre", "LIKE", "%$searchValue%");
                    });
            });

        $total = $data->count();

        $data = $data
            ->skip($offset)
            ->take($paginate)
            ->orderBy('id', 'DESC')->get();

        return response()->json(['rows' => $data, 'totalRecords' => $total], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $registro = Encuesta::create($data);

        return $this->show($registro->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Encuesta::with('insert')
            ->with('edit')
            ->with('empresa')
            ->with([
                'personas' => function ($query) {
                    $query->wherePivot('estado', '1')
                        ->orderBy('id', 'DESC');
                }
            ])
            ->where('id', $id)
            ->first();
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $registro = Encuesta::find($id);
        $registro->update($data);
        $registro->save();

        return response()->json($registro, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $registro = Encuesta::find($id);
        if ($registro->estado == '0') {
            $registro->estado = '1';
        } else {
            $registro->estado = '0';
        }
        $registro->save();

        return response()->json($registro, 200);
    }

    public function descargarPlantillaAlumnos()
    {
        return response()->download(storage_path("app/public/importar-alumnos.xlsx"));
    }

    public function importAlumnos(Request $request)
    {
        $file = $request->file('file');

        $data = Excel::import(new PersonaImport($request->user_id, $request->encuesta_id), $file);

        return response()->json($data, 200);
    }

    public function searchAlumnos(Request $request)
    {
        $searchValue = $request->input('search');

        $data = Encuesta::where('estado', '1')
            ->where('id', $request->input('id'))
            ->with('insert')
            ->with('edit')
            ->with('empresa')
            ->with([
                'personas' => function ($q) use ($searchValue) {
                    $q->wherePivot('estado', '1')
                        ->where(function ($query) use ($searchValue) {
                            $query->where("personas.id", "LIKE", "%$searchValue%")
                                ->orWhere("personas.nombres", "LIKE", "%$searchValue%")
                                ->orWhere('personas.apellido_materno', "LIKE", "%$searchValue%")
                                ->orWhere('personas.apellido_paterno', "LIKE", "%$searchValue%")
                                ->orWhere('personas.sexo', "LIKE", "%$searchValue%")
                                ->orWhere('personas.correo', "LIKE", "%$searchValue%");
                        });
                }
            ])
            ->first();

        return response()->json($data, 200);
    }

    public function deleteAlumno(Request $request, $id)
    {
        $registro = EncuestaPersona::find($id);
        $registro->estado = '0';
        $registro->save();

        return $this->show($request->encuesta_id);
    }

    public function checkIfSurveyIsAllowed($id)
    {
        $encuestaPersona = EncuestaPersona::with('encuesta.empresa')->with('persona')->where('id', $id)->first();

        if (!$encuestaPersona) {
            return response()->json(['error' => 'No se encontró la encuesta'], 422);
        }

        $encuesta = $encuestaPersona->encuesta;

        if (!$encuesta) {
            return response()->json(['error' => 'No se encontró la encuesta'], 422);
        }

        $persona = $encuestaPersona->persona;

        if (!$persona) {
            return response()->json(['error' => 'No se encontró al alumno'], 422);
        }

        $sucursal = $encuesta->empresa->nombre;

        if (!$sucursal) {
            return response()->json(['error' => 'No se encontró el colegio'], 422);
        }

        $currentDate = new DateTime();
        $initDate = new DateTime($encuesta->fecha_inicio);
        $finishDate = new DateTime($encuesta->fecha_fin);

        if ($currentDate < $initDate || $currentDate > $finishDate) {
            return response()->json([
                'person' => $persona,
                'encuesta_id' => $encuesta->id,
                'sucursal' => $sucursal,
                'isOutOfRange' => true
            ], 200);
        }

        if ($encuestaPersona->completada === '1') {
            return response()->json([
                'person' => $persona,
                'encuesta_id' => $encuesta->id,
                'sucursal' => $sucursal,
                'isOutOfRange' => false,
                'isCompleted' => true
            ], 200);
        }

        return response()->json([
            'person' => $persona,
            'encuesta_id' => $encuesta->id,
            'sucursal' => $sucursal,
            'isOutOfRange' => false,
            'isCompleted' => false
        ], 200);
    }

    public function saveAnswers(Request $request)
    {
        \DB::transaction(function () use ($request) {
            foreach ($request->respuestas as $key => $value) {
                EncuestaRespuesta::create([
                    'pregunta_id' => $value['pregunta_id'],
                    'respuesta_id' => $value['respuesta_id'],
                    'encuesta_persona_id' => $request->encuesta_persona_id
                ]);
            }

            $registro = EncuestaPersona::find($request->encuesta_persona_id);
            $registro->completada = '1';
            $registro->fecha_completada = now();
            $registro->save();
        });

        return response()->json('success', 200);
    }

    public function getSurveysByEmpresaId($sucursal_id)
    {
        $data = Encuesta::where('estado', '1')
            ->whereHas('empresa', function ($q) use ($sucursal_id) {
                $q->where('id', $sucursal_id);
            })
            ->get();

        return response()->json($data, 200);
    }

    public function getEncuestaWithPersonas($id)
    {
        return Encuesta::where('id', $id)
            ->with([
                'personas' => function ($query) {
                    $query->wherePivot('estado', '1');
                }
            ])
            ->first();
    }

    public function getLinksByEncuestaId(Request $request)
    {
        $encuesta = $this->getEncuestaWithPersonas($request['encuesta_id']);

        if ($encuesta['personas']->isEmpty()) {
            return response()->json(['error' => 'No hay alumnos registrados'], 400);
        }

        return Excel::download(new LinkExport($encuesta['personas']), 'encuesta.xlsx');
    }

    public function getExcelStatusByEncuestaId(Request $request)
    {
        $encuesta = $this->getEncuestaWithPersonas($request['encuesta_id']);

        if ($encuesta['personas']->isEmpty()) {
            return response()->json(['error' => 'No hay alumnos registrados'], 400);
        }


        return Excel::download(new StatusExport($encuesta['personas']), 'encuesta.xlsx');
    }

    public function getAnualReportExcelByEmpresaId(Request $request)
    {
        return Excel::download(new AnualReport($this->getStatusSchoolsByEmpresaId($request['empresa_id'])), 'colegios.xlsx');
    }

    public function getStatusSchoolsByEmpresaId($id, $searchValue = '')
    {
        $sucursales = EmpresaSucursal::where('estado', '1')
            ->whereHas('empresa', function ($q) {
                $q->where('estado', '1');
            })->with('encuestas.personas');

        if ($id != 'all') {
            $sucursales = $sucursales->where('id', $id);
        } else if($searchValue != ''){
            $sucursales = $sucursales->where("nombre", "LIKE", "%$searchValue%");
        }

        $sucursales = $sucursales->get();

        $statusSchools = $sucursales->map(function ($sucursal) {
            $respondio = 0;
            $noRespondio = 0;

            foreach ($sucursal->encuestas as $encuesta) {
                $respondio += $encuesta->personas->where('pivot.completada', 1)->count();
                $noRespondio += $encuesta->personas->where('pivot.completada', 0)->count();
            }

            return [
                'id' => $sucursal->id,
                'colegio' => $sucursal->nombre,
                'respondio' => $respondio,
                'noRespondio' => $noRespondio,
                'total' => $respondio + $noRespondio
            ];
        });

        return $statusSchools;
    }

    public function descargarReporte($id)
    {
        $encuestaPersona = EncuestaPersona::with('encuesta.empresa')->with('persona')->with('respuestas.pregunta.carrera.facultad')->with('respuestas.respuesta')->where('id', $id)->first();
        $facultades = [];

        foreach ($encuestaPersona['respuestas'] as $respuesta) {
            $facultad_id = $respuesta['pregunta']['carrera']['facultad_id'];
            $facultad_nombre = $respuesta['pregunta']['carrera']['facultad']['nombre']; // Ajusta el nombre según sea necesario
            $carrera_id = $respuesta['pregunta']['carrera']['id'];
            $carrera_nombre = $respuesta['pregunta']['carrera']['nombre'];
            $puntaje = (int) $respuesta['respuesta']['puntaje'];

            // Buscar si la facultad ya existe en el resultado
            if (!isset($facultades[$facultad_id])) {
                $background;

                switch ($facultad_id) {
                    case 1:
                        $background = '#0091CB;';
                        break;
                    case 2:
                        $background = '#d2932f';
                        break;
                    case 3:
                        $background = '#9f2222';
                        break;
                    default:
                        $background = '';
                        break;
                }

                $facultades[$facultad_id] = [
                    'facultad_id' => $facultad_id,
                    'nombre' => $facultad_nombre,
                    'carreras' => [],
                    'background' => $background
                ];
            }

            // Buscar si la carrera ya existe dentro de la facultad
            if (!isset($facultades[$facultad_id]['carreras'][$carrera_id])) {
                $facultades[$facultad_id]['carreras'][$carrera_id] = [
                    'carrera_id' => $carrera_id,
                    'nombre' => $carrera_nombre,
                    'puntaje' => 0
                ];
            }

            // Sumar el puntaje a la carrera correspondiente
            $facultades[$facultad_id]['carreras'][$carrera_id]['puntaje'] += $puntaje;
        }

        // Convertir puntaje a porcentaje y ordenar carreras
        foreach ($facultades as &$facultad) {
            foreach ($facultad['carreras'] as &$carrera) {
                $carrera['puntaje'] = ($carrera['puntaje'] / 25) * 100;
            }
            // Ordenar carreras de forma descendente por puntaje
            usort($facultad['carreras'], function ($a, $b) {
                return $b['puntaje'] <=> $a['puntaje'];
            });
        }

        // Ordenar facultades por facultad_id ascendente
        usort($facultades, function ($a, $b) {
            return $a['facultad_id'] <=> $b['facultad_id'];
        });

        // Convertir el resultado final en un array numerado
        $facultades = array_values($facultades);

        $intereses = [];

        $maxCarrera = null;

        foreach ($facultades as &$facultad) {
            foreach ($facultad['carreras'] as &$carrera) {
                // Si el puntaje es mayor o igual a 80%
                if ($carrera['puntaje'] >= 80) {
                    // Añadir la carrera al array $carrerasDestacadas
                    $intereses[] = Carrera::with('trabajos')->where('id', $carrera['carrera_id'])->first();
                }

                if (!$maxCarrera || $carrera['puntaje'] > $maxCarrera['puntaje']) {
                    $maxCarrera = $carrera;
                }
            }
        }

        if (empty($intereses) && $maxCarrera) {
            $intereses[] = Carrera::with('trabajos')->where('id', $maxCarrera['carrera_id'])->first();
        }

        if ($encuestaPersona) {
            $fechaFin = Carbon::parse($encuestaPersona->fecha_completada)->locale('es')->isoFormat('D [de] MMMM [de] YYYY');
            $pdf = \PDF::loadView('reporte', array(
                'facultades' => $facultades,
                'encuestaPersona' => $encuestaPersona,
                'fechaFin' => $fechaFin,
                'intereses' => $intereses
            ))->setOptions([
                'fontDir' => public_path('/fonts'),
                'fontCache' => public_path('/fonts')
            ]);
            return $pdf->download('Reporte-' . str_replace(' ', '', $encuestaPersona->persona->nombrecompleto) . '.pdf');
        }
    }

    public function getStatusSurveys(Request $request)
    {
        $back = config('constants.back_end');

        $searchValue = $request->input('searchValue');

        $encuesta = Encuesta::where('id', $request->input('encuesta_id'))
            ->with([
                'personas' => function ($query) use ($searchValue) {
                    $query->where('personas.estado', '1')
                        ->where(function ($query) use ($searchValue) {
                            $query->where("personas.nombres", "LIKE", "%$searchValue%")
                                ->orWhere('personas.apellido_materno', "LIKE", "%$searchValue%")
                                ->orWhere('personas.apellido_paterno', "LIKE", "%$searchValue%");
                        });
                }
            ])
            ->first();

        if ($encuesta['personas']->isEmpty()) {
            return response()->json('No hay alumnos registrados', 404);
        }

        $statusSurveys = [];

        foreach ($encuesta['personas'] as $persona) {
            $statusSurvey = (object) [
                'id' => $persona->id,
                'alumno' => $persona->nombrecompleto,
                'dni' => $persona->dni,
                'correo' => $persona->correo,
                'celular' => $persona->celular,
                'encuesta_completada' => $persona->pivot->completada === '1' ? true : false,
                'link' => $persona->pivot->completada === '1' ? $back . 'encuestas/descargarReporte/' . $persona->pivot->id : ''
            ];

            $statusSurveys[] = $statusSurvey;
        }

        return response()->json($statusSurveys, 200);
    }

    public function getStatusSchools(Request $request) {
        return response()->json($this->getStatusSchoolsByEmpresaId($request->input('empresa_id'), $request->input('searchValue')), 200);
    }
}

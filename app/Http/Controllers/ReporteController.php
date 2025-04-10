<?php

namespace App\Http\Controllers;
use App\Models\Encuesta;
use App\Models\EncuestaPersona;
use App\Models\EncuestaRespuesta;
use App\Models\Persona;
use App\Models\Pregunta;
use App\Models\Reporte;
use App\Models\Respuesta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Writer\Pdf;
use Barryvdh\DomPDF\Facade\Pdf as DomPDF;


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


    public function generarReporteIntereses($encuestaId, $personaId)
    {
        // Obtener información del alumno
        $persona = Persona::findOrFail($personaId);
        $encuesta = Encuesta::findOrFail($encuestaId);

        // Obtener todas las preguntas activas con sus áreas
        $preguntas = Pregunta::with('area')
            ->where('estado', '1')
            ->get();

        // Obtener todas las respuestas posibles (activas)
        $respuestas = Respuesta::where('estado', '1')->get();

        // Preparar las preguntas en el formato esperado por el componente React
        $preguntasFormateadas = [];

        foreach ($preguntas as $index => $pregunta) {
            // Crear las subpreguntas estándar para cada pregunta
            $subpreguntas = [
                [
                    'id' => 1,
                    'nombre' => 'Me gustaría realizar esta actividad',
                    'respuestas' => $this->formatearRespuestas($respuestas->where('puntaje', '!=', null)->values(), [])
                ],
                [
                    'id' => 2,
                    'nombre' => 'Tengo las habilidades para aprender a realizar esta actividad',
                    'respuestas' => $this->formatearRespuestas($respuestas->where('puntaje', '!=', null)->values(), [])
                ],
                [
                    'id' => 3,
                    'nombre' => '¿Crees que esta actividad te brindaría algún tipo de satisfacción (personal, económica, reconocimiento de los demás, entre otras)?',
                    'respuestas' => $this->formatearRespuestas(
                        $respuestas->where(function($query) {
                            $query->where('nombre', 'Si')->orWhere('nombre', 'No');
                        })->values(),
                        []
                    )
                ]
            ];

            $preguntasFormateadas[] = [
                'id' => $pregunta->id,
                'nombre' => $pregunta->nombre,
                'area' => $pregunta->area ? $pregunta->area->nombre : null,
                'subpreguntas' => $subpreguntas
            ];
        }
        $encuestaPersona = EncuestaPersona::where('encuesta_id', $encuestaId)
            ->where('persona_id', $personaId)
            ->first();

        $datosReporte = [
            'id' => $encuestaPersona ? $encuestaPersona->id : null,
            'completada' => $encuestaPersona ? $encuestaPersona->completada : null,
            'encuestaId' => $encuestaId,
            'personaId' => $personaId,
            'alumno' => $persona->nombre . ' ' . $persona->apellido,
            'sucursal' => $encuesta->sucursal ? $encuesta->sucursal->nombre : 'No especificada',
            'preguntas' => $preguntasFormateadas
        ];

        return Inertia::render('reportes/TestIntereses', $datosReporte);
    }

    private function formatearRespuestas($respuestas, $respuestasSeleccionadas)
    {
        $resultado = [];

        foreach ($respuestas as $respuesta) {
            $resultado[] = [
                'id' => $respuesta->id,
                'valor' => $respuesta->nombre,
                'icon' => $respuesta->icon,
                'puntaje' => $respuesta->puntaje,
                'seleccionada' => in_array($respuesta->id, $respuestasSeleccionadas)
            ];
        }

        return $resultado;
    }
    // Función para el reporte consolidado
    public function generarReporteConsolidados($encuestaId, $personaId)
    {
        // Lógica similar para el reporte consolidado
        $datosConsolidados = [
            'encuestaId' => $encuestaId,
            'personaId' => $personaId,
            'mensaje' => 'Reporte consolidado generado con éxito.',
        ];

        return Inertia::render('TestConsolidados', $datosConsolidados);
    }


    public function exportarReporteIntereses($encuestaId, $personaId)
    {
        // Get the necessary data
        $persona = Persona::findOrFail($personaId);
        $encuesta = Encuesta::findOrFail($encuestaId);

        // Get the encuestaPersona record
        $encuestaPersona = EncuestaPersona::where('encuesta_id', $encuestaId)
            ->where('persona_id', $personaId)
            ->first();

        if (!$encuestaPersona || $encuestaPersona->completada != 1) {
            return response()->json(['error' => 'La encuesta no ha sido completada'], 400);
        }

        // Get the responses for this survey
        $respuestas = EncuestaRespuesta::where('encuesta_persona_id', $encuestaPersona->id)->get();

        // Create HTML content for the PDF directly
        $html = '
    <!DOCTYPE html>
    <html>


    </html>';

        // Generate the PDF from the HTML string
        $pdf = DomPDF::loadHTML($html);

        // Set the filename
        $filename = 'Reporte_Intereses_' . $persona->nombre . '_' . $persona->apellido . '.pdf';

        // Return the PDF as a download
        return $pdf->download($filename);
    }
}

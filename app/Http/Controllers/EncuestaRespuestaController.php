<?php

namespace App\Http\Controllers;

use App\Models\EncuestaRespuesta;
use App\Models\Persona;
use App\Models\EncuestaPersona;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Encuesta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EncuestaRespuestaController extends Controller
{
    public function index(Request $request)
    {

    }


    public function store(Request $request)
    {
        try {
            $respuestas = $request->input('respuestas');

            // Validate that the encuesta_persona_id exists
            if (!empty($respuestas) && isset($respuestas[0]['encuesta_persona_id'])) {
                $encuestaPersonaId = $respuestas[0]['encuesta_persona_id'];

                // Check if the encuesta_persona_id exists in the encuesta_personas table
                $encuestaPersonaExists = DB::table('encuesta_personas')->where('id', $encuestaPersonaId)->exists();

                if (!$encuestaPersonaExists) {
                    return response()->json([
                        'error' => 'La encuesta persona con ID ' . $encuestaPersonaId . ' no existe.'
                    ], 404);
                }

                foreach ($respuestas as $respuesta) {
                    EncuestaRespuesta::create($respuesta);
                }


                $encuestaPersona = EncuestaPersona::find($encuestaPersonaId);
                if ($encuestaPersona) {
                    $encuestaPersona->completada = 1;
                    $encuestaPersona->save();
                }


                return response()->json(['message' => 'Respuestas guardadas correctamente']);
            }

            return response()->json(['error' => 'No se proporcionaron respuestas válidas'], 400);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al guardar las respuestas: ' . $e->getMessage()
            ], 500);
        }
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

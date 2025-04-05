<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use App\Models\Respuesta;

class CatalogueController extends Controller
{
    function getPreguntas()
    {
        $data = Pregunta::with('carrera.facultad')->get();

        return response()->json($data, 200);
    }

    function getRespuestas()
    {
        $data = Respuesta::all();

        return response()->json($data, 200);
    }
}

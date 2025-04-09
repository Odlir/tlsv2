<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonaController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate') ?? 5;
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
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('personas/personas', [
            'personas' => $data,
            'totalRecords' => $totalRecords,
            'totalPages' => ceil($totalRecords / $paginate),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'apellidoPaterno' => 'required|string',
            'apellidoMaterno' => 'required|string',
            'nombres' => 'required|string',
            'genero' => 'required|string',
            'correoPersonal' => 'required|email',
            'dni' => 'required|string',
            'celular' => 'required|string',
        ]);

        $persona = new Persona();
        $persona->apellido_paterno = $validated['apellidoPaterno'];
        $persona->apellido_materno = $validated['apellidoMaterno'];
        $persona->nombres = $validated['nombres'];
        $persona->sexo = $validated['genero'];
        $persona->email = $validated['correoPersonal'];
        $persona->correo = $validated['correoPersonal'];
        $persona->dni = $validated['dni'];
        $persona->celular = $validated['celular'];
        $persona->anio = date('Y');
        $persona->rol_id = 2;
        $persona->insert_user_id = auth()->id();
        $persona->estado ='1';
        $persona->save();
        return response()->json($persona, 201);
    }


    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'apellidoPaterno' => 'required|string',
            'apellidoMaterno' => 'required|string',
            'nombres' => 'required|string',
            'genero' => 'required|string',
            'correoPersonal' => 'required|email',
            'dni' => 'required|string',
            'celular' => 'required|string',
        ]);

        $persona = Persona::find($id);
        if (!$persona) {
            return response()->json(['message' => 'Persona no encontrada'], 404);
        }
        $persona->apellido_paterno = $validated['apellidoPaterno'];
        $persona->apellido_materno = $validated['apellidoMaterno'];
        $persona->nombres = $validated['nombres'];
        $persona->sexo = $validated['genero'];
        $persona->email = $validated['correoPersonal'];
        $persona->correo = $validated['correoPersonal'];
        $persona->dni = $validated['dni'];
        $persona->celular = $validated['celular'];

        $persona->save();

        return response()->json($persona, 200);
    }


}


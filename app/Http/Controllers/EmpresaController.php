<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Persona;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmpresaController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->input('paginate') ?? 20;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'razonSocial' => 'required|string',
            'contacto' => 'required|string',
            'email' => 'required|email',
            'telefono' => 'required|string',
            'sede' => 'required|string',
            'codigo' => 'required|string',
            'nivel' => 'required|string',
            'gestion' => 'required|string',
            'gestionDepartamento' => 'required|string',
            'departamento' => 'required|string',
            'provincia' => 'required|string',
        ]);

        $empresa = new Empresa();
        $empresa->razon_social = $validated['razonSocial'];
        $empresa->contacto = $validated['contacto'];
        $empresa->email = $validated['email'];
        $empresa->telefono = $validated['telefono'];
        $empresa->sede = $validated['sede'];
        $empresa->codigo = $validated['codigo'];
        $empresa->nivel = $validated['nivel'];
        $empresa->gestion = $validated['gestion'];
        $empresa->gestion_departamento = $validated['gestionDepartamento'];
        $empresa->departamento = $validated['departamento'];
        $empresa->provincia = $validated['provincia'];
        $empresa->estado = '1';
        $empresa->rol_id = '2';
        $empresa->insert_user_id = auth()->id();

        $empresa->save();

        return response()->json($empresa, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'razonSocial' => 'required|string',
            'contacto' => 'required|string',
            'email' => 'required|email',
            'telefono' => 'required|string',
            'sede' => 'required|string',
            'codigo' => 'required|string',
            'nivel' => 'required|string',
            'gestion' => 'required|string',
            'gestionDepartamento' => 'required|string',
            'departamento' => 'required|string',
            'provincia' => 'required|string',
        ]);

        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada'], 404);
        }
        $empresa->razon_social = $validated['razonSocial'];
        $empresa->contacto = $validated['contacto'];
        $empresa->email = $validated['email'];
        $empresa->telefono = $validated['telefono'];
        $empresa->sede = $validated['sede'];
        $empresa->codigo = $validated['codigo'];
        $empresa->nivel = $validated['nivel'];
        $empresa->gestion = $validated['gestion'];
        $empresa->gestion_departamento = $validated['gestionDepartamento'];
        $empresa->departamento = $validated['departamento'];
        $empresa->provincia = $validated['provincia'];

        $empresa->save();

        return response()->json($empresa, 200);
    }

    public function destroy($id)
    {
        $empresa = Persona::findOrFail($id);
        try {
            $empresa->estado = 0;
            $empresa->update_user_id = auth()->id();
            $empresa->save();
            return response()->json([
                'message' => 'Persona desactivada correctamente.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al desactivar la persona.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

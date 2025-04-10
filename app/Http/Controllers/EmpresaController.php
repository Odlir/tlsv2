<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\EmpresaSucursal;
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
            'email' => 'required|string',
            'telefono' => 'required|string',
            'sede' => 'required|string',
            'codigo' => 'required|string',
            'nivel' => 'required|string',
            'gestion' => 'required|string',
            'gestion_departamento' => 'required|string',
            'distrito' => 'required|string',
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
        $empresa->gestion_departamento = $validated['gestion_departamento'];
        $empresa->ubigeo = $validated['distrito'];
        $empresa->insert_user_id = auth()->id();
        $empresa->estado = 1;

        $empresa->save();
        $empresaSucursal = new EmpresaSucursal();
        $empresaSucursal->nombre = 'Sucursal Principal';  // O cualquier otro valor que desees
        $empresaSucursal->empresa_id = $empresa->id;  // Asociar la sucursal con la empresa recién creada
        $empresaSucursal->insert_user_id = auth()->id();
        $empresaSucursal->edit_user_id = auth()->id();  // Puedes ajustar este valor según sea necesario

        // Guardar la sucursal
        $empresaSucursal->save();
        return response()->json($empresa, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'razonSocial' => 'required|string',
            'contacto' => 'required|string',
            'email' => 'required|string',
            'telefono' => 'required|string',
            'sede' => 'required|string',
            'codigo' => 'required|string',
            'nivel' => 'required|string',
            'gestion' => 'required|string',
            'gestion_departamento' => 'required|string',
            'distrito' => 'required|string',
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
        $empresa->gestion_departamento = $validated['gestion_departamento'];
        $empresa->ubigeo = $validated['distrito'];
        $empresa->insert_user_id = auth()->id();
        $empresa->save();
        return response()->json($empresa, 200);
    }

    public function destroy($id)
    {
        $empresa = Empresa::findOrFail($id);
        try {
            $empresa->estado = 0;
            $empresa->save();
            return response()->json([
                'message' => 'Empresa desactivada correctamente.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al desactivar la empresa.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\EmpresaSucursal;
use Illuminate\Http\Request;

class EmpresaController extends Controller
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

        $data = Empresa::where('estado', '1')
            ->where(function ($query) use ($searchValue) {
                $query->where('id', "LIKE", "%$searchValue%")
                    ->orWhere('razon_social', "LIKE", "%$searchValue%")
                    ->orWhere('contacto', "LIKE", "%$searchValue%")
                    ->orWhere('email', "LIKE", "%$searchValue%")
                    ->orWhere('telefono', "LIKE", "%$searchValue%");
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
        //
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

        $registro = Empresa::create($data);

        return $this->show($registro->id);

        // return response()->json($registro, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Empresa::with('insert')
            ->with('edit')
            ->with('distrito.provincia.departamento')
            ->with([
                'sucursales' => function ($query) {
                    $query->where('estado', '1')
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

        $registro = Empresa::find($id);
        $registro->update($data);
        $registro->save();

        return $this->show($id);

        // return response()->json($registro, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $registro = Empresa::find($id);
        $registro->estado = '0';
        $registro->save();

        $sucursales = EmpresaSucursal::where('empresa_id', $id)->get();

        foreach ($sucursales as $s) {
            $s->estado = '0';
            $s->save();
        }

        return response()->json($registro, 200);
    }
}

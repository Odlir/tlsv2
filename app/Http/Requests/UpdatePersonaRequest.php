<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonaRequest extends FormRequest
{
    public function rules()
    {
        return [
            'nombres' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'nullable|string|max:255',
            'correo' => 'required|email|max:255|unique:personas,correo,' . $this->route('persona'),
            'sexo' => 'required|string|max:1',
        ];
    }

    public function messages()
    {
        return [
            'nombres.required' => 'El nombre es obligatorio.',
            'apellido_paterno.required' => 'El apellido paterno es obligatorio.',
            'correo.required' => 'El correo es obligatorio.',
            'sexo.required' => 'El sexo es obligatorio.',
        ];
    }
}

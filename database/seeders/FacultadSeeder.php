<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Facultad;
use Illuminate\Database\Seeder;

class FacultadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facultads = [
            [
                "nombre" => "Mecanico",
                "descripcion" => "Trabaja con cosas/objetos",
            ],
            [
                "nombre" => "Cientifico",
                "descripcion" => "Trabaja con ideas/cosas",
            ],
            [
                "nombre" => "Creativo",
                "descripcion" => "Trabaja con ideas/personas",
            ],
            [
                "nombre" => "Social",
                "descripcion" => "Trabaja con personas",
            ],
            [
                "nombre" => "Emprendedor",
                "descripcion" => "Trabaja con datos/personas",
            ],
            [
                "nombre" => "Convencional",
                "descripcion" => "Trabaja con datos/cosas",
            ],
        ];

        Facultad::insert($facultads);
    }
}

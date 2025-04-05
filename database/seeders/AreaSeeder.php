<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Area;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areas = [
            [
                'nombre' => 'Recursos Naturales',
                'facultad_id' => 1,
            ],
            [
                'nombre' => 'Mecanica y Transformación',
                'facultad_id' => 1,
            ],
            [
                'nombre' => 'Transporte y FFAA',
                'facultad_id' => 1,
            ],

            [
                'nombre' => 'Ciencias Exactas',
                'facultad_id' => 2,
            ],
            [
                'nombre' => 'Ciencias de la Salud',
                'facultad_id' => 2
            ],
            [
                'nombre' => 'Ciencias Tecnológicas',
                'facultad_id' => 2
            ],
            [
                'nombre' => 'Artes Escenicas',
                'facultad_id' => 3
            ],
            [
                'nombre' => 'Diseño y Artes plasticas',
                'facultad_id' => 3
            ],
            [
                'nombre' => 'Artes Literarias',
                'facultad_id' => 3
            ],
            [
                'nombre' => 'Letras y Humanidades',
                'facultad_id' => 4
            ],
            [
                'nombre' => 'Asistenciales',
                'facultad_id' => 4
            ],
            [
                'nombre' => 'Administracion Social',
                'facultad_id' => 4
            ],
            [
                'nombre' => 'Ciencias Politicas',
                'facultad_id' => 5
            ],
            [
                'nombre' => 'Gerencia y Administracion',
                'facultad_id' => 5
            ],
            [
                'nombre' => 'Comunicaciones',
                'facultad_id' => 5
            ],
            [
                'nombre' => 'Analisis de Datos',
                'facultad_id' => 6
            ],
            [
                'nombre' => 'Trabajo de Oficina',
                'facultad_id' => 6
            ]
        ];
        Area::insert($areas);
    }
}

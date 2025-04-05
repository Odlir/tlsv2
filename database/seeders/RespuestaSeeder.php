<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Respuesta;
use Illuminate\Database\Seeder;

class RespuestaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $respuestas = [
            ["nombre"=>"No me interesa en lo absoluto", "icon" => "totally_agree.png", "puntaje"=>0],
            ["nombre"=>"Me resulta indiferente", "icon" => "agree.png", "puntaje"=>1],
            ["nombre"=>"Me interesa un poco", "icon" => "neither_agree_nor_disagree.png", "puntaje"=>2],
            ["nombre"=>"Me interesa bastante", "icon" => "disagree.png", "puntaje"=>3],
            ["nombre"=>"Me interesa mucho", "icon" => "totally_disagree.png", "puntaje"=>4]
        ];

        Respuesta::insert($respuestas);
    }
}

<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('rols')->insert([
            'nombre' => 'Usuario',
        ]);

        DB::table('rols')->insert([
            'nombre' => 'Alumno',
        ]);
    }
}

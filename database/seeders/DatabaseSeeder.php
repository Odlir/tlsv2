<?php

namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $seeder = [
            RolSeeder::class,
            UserSeeder::class,
            FacultadSeeder::class,
            AreaSeeder::class,
            CarreraSeeder::class,
            PreguntaSeeder::class,
            RespuestaSeeder::class,
            UbigeoSeeder::class
        ];
        foreach ($seeder as $class) {
            $this->call($class);
        }
    }
}

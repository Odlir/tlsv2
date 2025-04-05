<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('razon_social', 300);
            $table->string('email')->nullable();
            $table->string('contacto')->nullable();
            $table->string('telefono')->nullable();
            $table->char('estado', 1)->comment('0-Inactivo/1-Activo')->default(1);
            $table->string('sede')->nullable();
            $table->string('codigo')->nullable();
            $table->string('nivel')->nullable();
            $table->string('gestion')->nullable();
            $table->string('gestion_departamento')->nullable();
            $table->string('ubigeo', 6)->nullable();
            $table->foreign('ubigeo')->references('id')->on('distritos');

            $table->unsignedBigInteger('insert_user_id')->comment('Usuario que hizo el registro');
            $table->foreign('insert_user_id')->references('id')->on('users');

            $table->unsignedBigInteger('edit_user_id')->comment('Usuario que editó el registro')->nullable();
            $table->foreign('edit_user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};

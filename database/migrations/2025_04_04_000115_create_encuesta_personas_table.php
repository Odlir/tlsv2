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
        Schema::create('encuesta_personas', function (Blueprint $table) {
            $table->id();

            $table->char('estado', 1)->comment('0-Inactivo/1-Activo')->default(1);

            $table->unsignedBigInteger('persona_id');
            $table->foreign('persona_id')->references('id')->on('personas');

            $table->unsignedBigInteger('encuesta_id');
            $table->foreign('encuesta_id')->references('id')->on('encuestas');

            $table->char('completada')->comment('0-Incompleta/1-Completa')->default(0);

            $table->date('fecha_completada')->nullable();

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
        Schema::dropIfExists('encuesta_personas');
    }
};

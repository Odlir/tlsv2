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
        Schema::create('encuesta_respuestas', function (Blueprint $table) {
            $table->id();

            $table->char('estado', 1)->comment('0-Inactivo/1-Activo')->default(1);

            $table->unsignedBigInteger('pregunta_id');
            $table->foreign('pregunta_id')->references('id')->on('preguntas');

            $table->unsignedBigInteger('respuesta_id');
            $table->foreign('respuesta_id')->references('id')->on('respuestas');

            $table->unsignedBigInteger('encuesta_persona_id');
            $table->foreign('encuesta_persona_id')->references('id')->on('encuesta_personas');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encuesta_respuestas');
    }
};

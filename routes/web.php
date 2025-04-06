<?php

use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\EncuestaController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\EmpresaSucursalController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\UbigeoController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::resource('users', UserController::class);
Route::resource('personas', PersonaController::class);
Route::resource('empresas', EmpresaController::class);
Route::resource('empresa_sucursal', EmpresaSucursalController::class);
Route::resource('encuestas', EncuestaController::class);


Route::post('/encuestas/importAlumnos', [EncuestaController::class, 'importAlumnos']);
Route::get('/searchAlumnos', [EncuestaController::class, 'searchAlumnos']);
Route::put('/encuestas/deleteAlumno/{id}', [EncuestaController::class, 'deleteAlumno']);
Route::post('/encuestas/descargarPlantillaAlumnos', [EncuestaController::class, 'descargarPlantillaAlumnos']);
Route::get('/getSurveysByEmpresaId/{id}', [EncuestaController::class, 'getSurveysByEmpresaId']);
Route::get('/getStatusSurveys', [EncuestaController::class, 'getStatusSurveys']);
Route::get('/getStatusSchools', [EncuestaController::class, 'getStatusSchools']);
Route::post('/getLinks', [EncuestaController::class, 'getLinksByEncuestaId']);
Route::post('/getExcelStatus', [EncuestaController::class, 'getExcelStatusByEncuestaId']);
Route::post('/getAnualReportExcel', [EncuestaController::class, 'getAnualReportExcelByEmpresaId']);


Route::get('/departamentos', [UbigeoController::class, 'getDepartamentos'])->name('getDepartamentos');
Route::get('/provincias/{id}', [UbigeoController::class, 'getProvinciaByDepartamentoId'])->name('getProvincias');
Route::get('/distritos/{id}', [UbigeoController::class, 'getDistritoByProvinciaId'])->name('getDistritos');


Route::get('/preguntas', [CatalogueController::class, 'getPreguntas'])->name('getPreguntas');
Route::get('/respuestas', [CatalogueController::class, 'getRespuestas'])->name('getRespuestas');


Route::get('/encuestas/checkIfSurveyIsAllowed/{id}', [EncuestaController::class, 'checkIfSurveyIsAllowed']);
Route::post('/encuestas/saveAnswers', [EncuestaController::class, 'saveAnswers']);
Route::get('/encuestas/descargarReporte/{encuesta_persona_id}', [EncuestaController::class, 'descargarReporte']);

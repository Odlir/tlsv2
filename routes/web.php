<?php

use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\EncuestaController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\EmpresaSucursalController;
use App\Http\Controllers\EncuestaRespuestaController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\UbigeoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReporteController;

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
Route::resource('catalogues', CatalogueController::class);
Route::resource('reportes', ReporteController::class);
Route::resource('anual', AnualController::class);
Route::resource('encuestaRespuesta', EncuestaRespuestaController::class);

Route::get('/reporte_anual', [ReporteController::class, 'reporte_anual']);

Route::get('/getEmpresaSucursal', [EmpresaSucursalController::class, 'getEmpresaSucursal'])->name('getEmpresaSucursal');
Route::get('/getEncuestas', [EncuestaController::class, 'getEncuestas'])->name('getEncuestas');
Route::get('/getEstatusEncuesta', [EncuestaController::class, 'getEstatusEncuesta'])->name('getEstatusEncuesta');

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

Route::get('/test-intereses/{encuestaId}/{personaId}', [ReporteController::class, 'generarReporteIntereses'])->name('reportes.intereses');
Route::get('/exportar/intereses/{encuestaId}/{personaId}', [ReporteController::class, 'exportarReporteIntereses'])
    ->name('reportes.exportar.intereses');
Route::get('/test-consolidados/{encuestaId}/{personaId}', [ReporteController::class, 'generarReporteConsolidados'])->name('reportes.consolidados');

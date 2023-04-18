<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\DistributionFileController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('test');
});

Route::get('/asset/{id}/form', [AssetController::class, 'edit']);
Route::post('/asset/{id}/update', [AssetController::class, 'update']);
Route::get('/asset/{id}/detail', [AssetController::class, 'show']);
Route::get('/asset', [AssetController::class, 'index'])->name('asset');
Route::get('/asset/form', [AssetController::class, 'create']);
Route::post('/asset', [AssetController::class, 'store']);
Route::post('/asset/import', [AssetController::class, 'importExcelFile']);

Route::get('/distributions/file/{file}', DistributionFileController::class)->name('show-bast');

Route::get('/employees', [EmployeeController::class, 'index']);
Route::get('/employees/form', [EmployeeController::class, 'create']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::get('/employees/{id}/form', [EmployeeController::class, 'edit']);
Route::post('/employees/{id}/update', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
Route::post('/employees/import', [EmployeeController::class, 'importEmployee']);

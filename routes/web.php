<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DistributionController;
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

Route::get('/', [DashboardController::class, 'index']);

Route::get('/asset/{id}/form', [AssetController::class, 'edit']);
Route::post('/asset/{id}/update', [AssetController::class, 'update']);
Route::get('/asset/{id}/detail', [AssetController::class, 'show']);
Route::get('/asset', [AssetController::class, 'index'])->name('asset');
Route::get('/asset/form', [AssetController::class, 'create']);
Route::get('/asset/{id}/label/{mode}', [AssetController::class, 'showLabel']);
Route::post('/asset', [AssetController::class, 'store']);
Route::post('/asset/import', [AssetController::class, 'importExcelFile']);
Route::post('/asset/export', [AssetController::class, 'exportPdfFile']);
Route::get('/asset/export/preview', [AssetController::class, 'renderPDF'])->name('AssetPDF');
Route::delete('/asset/{id}', [AssetController::class, 'destroy']);


Route::get('/employees', [EmployeeController::class, 'index']);
Route::get('/employees/form', [EmployeeController::class, 'create']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::get('/employees/{id}/form', [EmployeeController::class, 'edit']);
Route::post('/employees/{id}/update', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
Route::post('/employees/import', [EmployeeController::class, 'importEmployee']);


Route::get('/distributions', [DistributionController::class, 'index']);
Route::get('/distributions/form', [DistributionController::class, 'create']);

Route::get('/distributions/file/{file}', DistributionFileController::class)->name('show-bast');
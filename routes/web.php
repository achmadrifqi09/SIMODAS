<?php

use App\Http\Controllers\AssetController;
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

// Route::get('/asset', function () {
//     return Inertia::render('Asset/DashboardAsset');
// });

Route::get('/asset/add', function () {
    return Inertia::render('Asset/AddAsset');
});

Route::post('/asset', [AssetController::class, 'StoredTangibleAsset']);
Route::get('/asset', [AssetController::class, 'Index']);

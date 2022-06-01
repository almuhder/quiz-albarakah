<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('signup', [\App\Http\Controllers\AuthAdminController::class, 'signup']);
Route::post('login', [\App\Http\Controllers\AuthAdminController::class, 'login']);
Route::get('logout', [\App\Http\Controllers\AuthAdminController::class, 'logout'])
    ->middleware(['auth:admin','scopes:admin']);


Route::post('forgot-password', [\App\Http\Controllers\AuthAdminController::class, 'forgotPassword']);
Route::post('reset-password', [\App\Http\Controllers\AuthAdminController::class, 'resetPassword']);
Route::post('change-password', [\App\Http\Controllers\AuthAdminController::class, 'changePassword'])
    ->middleware(['auth:admin','scopes:admin']);

Route::get('question', [\App\Http\Controllers\QuestionController::class, 'index'])
    ->middleware(['auth:student','scope:student,admin']);
Route::middleware(['auth:admin','scopes:admin'])->prefix('question')->group(function (){
    Route::put('edit/{questionID}', [\App\Http\Controllers\QuestionController::class, 'update']);
    Route::post('/add', [\App\Http\Controllers\QuestionController::class, 'store']);
    Route::delete('delete/{product}', [\App\Http\Controllers\QuestionController::class, 'destroy']);
});


Route::middleware(['auth:admin','scopes:admin'])->prefix('type')->group(function (){
    Route::get('/', [\App\Http\Controllers\TypeController::class, 'index']);
    Route::put('edit/{typeID}', [\App\Http\Controllers\TypeController::class, 'update']);
    Route::post('/add', [\App\Http\Controllers\TypeController::class, 'store']);
    Route::delete('delete/{typeID}', [\App\Http\Controllers\TypeController::class, 'destroy']);
});

Route::middleware(['auth:admin','scopes:admin'])->prefix('student-code')->group(function (){
    Route::get('/', [\App\Http\Controllers\StudentController::class, 'index']);
    Route::get('student-results', [\App\Http\Controllers\StudentController::class, 'studentResults']);
    Route::post('/generate', [\App\Http\Controllers\StudentController::class, 'store']);
    Route::post('/search', [\App\Http\Controllers\StudentController::class, 'search']);
    Route::put('edit/{studentID}', [\App\Http\Controllers\StudentController::class, 'update']);
    Route::delete('delete/{studentID}', [\App\Http\Controllers\StudentController::class, 'destroy']);
});
Route::post('store-result', [\App\Http\Controllers\StudentController::class, 'storeResult'])
    ->middleware(['auth:student','scope:student,admin']);
Route::post('login-student', [\App\Http\Controllers\StudentController::class, 'login']);

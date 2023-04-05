<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ExamController;

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
Route::controller(AuthAdminController::class)->prefix('admin')->group(function () {
    Route::post('login', 'login');
    Route::post('forgot-password', 'forgotPassword');
    Route::post('reset-password', 'resetPassword');
    Route::middleware(['auth:admin','scopes:admin'])->group(function () {
        Route::post('change-password', 'changePassword');
        Route::get('logout', 'logout');
    });
});

Route::controller(SettingController::class)->prefix('settings')->group(function () {
    Route::middleware(['auth:admin','scopes:admin'])->group(function () {
        Route::post('edit-time/{setting}', 'update');
        Route::get('/dash', 'statistics');
    });
    Route::get('/', 'index')->middleware(['auth:admin,student']);
});

Route::apiResource('question', QuestionController::class)->only(['store', 'update', 'destroy'])
    ->middleware(['auth:admin','scopes:admin']);
Route::get('question', [QuestionController::class, 'index'])->middleware(['auth:admin','scopes:admin']);

Route::apiResource('type', TypeController::class)->middleware(['auth:admin','scopes:admin']);

Route::apiResource('student', StudentController::class)->only(['store', 'update', 'destroy'])
    ->middleware(['auth:admin','scopes:admin']);

Route::controller(StudentController::class)->prefix('student')->group(function () {
    Route::middleware(['auth:admin','scopes:admin'])->group(function () {
        Route::put('activate-deactivate/{student}', 'activateDeactivate');
        Route::post('/all','index');
        Route::get('results','studentsWithResults');
    });
    Route::post('login','login');
});

Route::controller(ExamController::class)->prefix('exam')->middleware('auth:student')->group(function () {
    Route::get('start', 'startExam');
    Route::post('end', 'endExam');
});

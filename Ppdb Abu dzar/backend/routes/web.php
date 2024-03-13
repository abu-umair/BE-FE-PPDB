<?php

use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Notification_navbarController;
use App\Http\Controllers\Admin\Search_navbarController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('index');
});

Route::get('privacy-policy', function () {
    return view('kebijakan-privasi');
});

Route::prefix('admin')
    // ->namespace('Admin') 
    ->middleware(['auth', 'admin', 'preventBackHistory'])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])
            ->name('dashboard');
        Route::resource('teacher', TeacherController::class);
        Route::delete('change_status/{id}', [TeacherController::class, 'change_status'])->name('change_status');

        //-----------------------------------------------------------------------------------------------------------------

        // notification navbar
        Route::controller(Notification_navbarController::class)->group(function () {
            Route::get('fetch-notifications', 'fetchnotification');
            Route::get('updateclick', 'updateclick');
            Route::get('countnotif', 'countnotif');
        });

        Route::controller(Search_navbarController::class)->group(function () {
            //my search navbar
            Route::post('/search', 'search')
                ->name('searchnavbar');
            // Credits
            Route::get('credits', 'credits');
        });
    });
*/

Route::get('all-clear', function () {
    Artisan::call('config:clear'); //config-clear
    Artisan::call('config:cache'); //config-cache
    Artisan::call('cache:clear'); //cache-clear
    Artisan::call('view:cache'); //view-cache
    Artisan::call('view:clear'); //view-clear
    Artisan::call('route:cache'); //route-cache
    Artisan::call('route:clear'); //route-clear

    return 'Configuration cache cleared! <br> Configuration cached successfully!';
});

Route::get('storage-link', function () {
    Artisan::call('storage:link');
    return 'The links have been created.';
});

// Auth::routes(['verify' => true]);

<?php

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

Route::get('/', function () {
    return view('home');
});
Route::get('/users', 'HomeController@getUser')->name('users.list');
Route::get('/raju', 'RahuController@raju');
Route::get('/bind', 'RahuController@display');
Route::get('/bind', 'RahuController@display');
Route::get('/login', 'HomeController@login')->name('login');
Route::post('/login', 'HomeController@loginSubmit')->name('login.submit');
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RahuController extends Controller
{
    public function raju()
    {
        return view('rahuone');
    }
public function display()
{
    $data=User::select('*')->get();
    return view('rahuone')->with(['data'=>$data]);
    echo $data;
}
}

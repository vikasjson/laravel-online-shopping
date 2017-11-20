<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Users;


class HomeController extends Controller
{
    public function getUser()
    {
        $users = Users::orderBy('id','asc')
            ->with('address','address.street')
            ->get();
        return view('home')->with(['users'=>$users]);
    }
}

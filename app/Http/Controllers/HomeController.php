<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;


class HomeController extends Controller
{
    public function getUser()
    {
        $users = User::orderBy('id','asc')
            ->with('address','address.street')
            ->get();
        return view('home')->with(['users'=>$users]);
    }

    public function login()
    {
//        $password = 'admin';
//        $hashedPassword = Hash::make($password);
//        echo $hashedPassword;
//        exit;
      return view('login');
    }
    public function loginSubmit(Request $req)
    {
      if( Auth::gaurd('user')->attempt(['email' => $req->email, 'password' => $req->password],true))
      {
          echo 'login successfull';
          exit;
      }
    }
}

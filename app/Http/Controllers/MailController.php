<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function emailView()
    {
       return view('email.view-email');
    }



    public function emailSend()
    {
        Mail::send(new SendMail());
        echo "Success";
    }
}

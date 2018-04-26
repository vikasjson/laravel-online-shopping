<?php
namespace App\Http\Controllers\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use DB;
class Login extends Controller
{
    public function __construct()
    {
        $this->middleware('guest:customer');
    }
    public function login(Request $req)
    {
        $campaign = DB::table('campaigns')
            ->select('image')
            ->whereRaw('CURRENT_DATE <=end_date')
            ->orderBy('end_date')->first();
        return view('customer.login')
            ->with([
                'campaign' => $campaign,
                'continue' => $req->continue
            ]);
    }
    public function submitLogin(Request $req)
    {
        $this->validate($req, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        if ($req->continue)
        {
            if (Auth::guard('customer')->attempt(['email'=>$req->email, 'password'=>$req->password], $req->remember)) {
                return view('customer.login-success');
            }
        }
        else
        {
            if (Auth::guard('customer')->attempt(['email'=>$req->email, 'password'=>$req->password], $req->remember)) {
                return redirect()->intended(route('customer.locker'));
            }
        }
        return redirect()->back()->with('error_message', 'Your email/password combination was incorrect')->withInput($req->only('email', 'remember'));
    }
}
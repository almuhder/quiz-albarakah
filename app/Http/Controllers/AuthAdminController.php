<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Admin;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Nette\Schema\ValidationException;

class AuthAdminController extends Controller
{


    public function signup(RegisterRequest $request){

        $admin = Admin::query()->create([
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);
        $token = $admin->createToken('admin');
        $data['admin']=$admin;
        $data['type']='Bearer';
        $data['token']=$token->accessToken;
        //return $this->returnData('data', $data,'logged in successfully');
        return response()->json($data,200);
    }

    public function login(LoginRequest $request){

        $user = Admin::query()->where('email', $request->email)->first();
        if(!isset($user)) {
            return 'User Not Found';
        }
        if (!Hash::check(request('password'), $user->password)) {
            return "Incorrect password";
        }
        $token=$user->createToken('admin');
        $data['admin']=$user;
        $data['type']='Bearer';
        $data['token']=$token->accessToken;

//        return $this->returnData('', $data,'logged in successfully');
        return response()->json($data, 200);
    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }

    public function forgotPassword(Request $request) {
        $request->validate([
            'email' => 'required|email'
        ]);
        $status = Password::sendResetLink($request->only('email'));
        if ($status == Password::RESET_LINK_SENT) {
            return $status;
        }
        throw \Illuminate\Validation\ValidationException::withMessages([
            'email'=> [trans($status)],
        ]);
    }


}

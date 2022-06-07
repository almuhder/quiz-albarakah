<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\Admin;
use App\Traits\GeneralTrait;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Nette\Schema\ValidationException;
use \Illuminate\Support\Str;

class AuthAdminController extends Controller
{
use GeneralTrait;

    public function signup(RegisterRequest $request){

        $admin = Admin::query()->create([
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);
        $token = $admin->createToken('admin', ['admin']);
        $data['admin']=$admin;
        $data['type']='Bearer';
        $data['token']=$token->accessToken;
        return $this->returnData('data', $data,'successfully registered');
    }

    public function login(LoginRequest $request){
        $user = Admin::query()->where('email', $request->email)->first();
        if(!isset($user)) {
           return $this->returnErrorMessage('User Not Found', 404);
        }
        if (!Hash::check(request('password'), $user->password)) {
            return $this->returnErrorMessage('Incorrect password', 403);
        }

        $token=$user->createToken('admin', ['admin']);
        $data['admin']=$user;
        $data['type']='Bearer';
        $data['token']=$token->accessToken;
//        $token = $user->createToken('My Token', ['place-orders'])->accessToken;
//        ['place-orders']

        return $this->returnData('data', $data,'logged in successfully');
    }

    public function logout() {
        Auth::user()->tokens()->delete();
        return $this->returnSuccessMessage('logged out successfully');
    }

    public function forgotPassword(ForgotPasswordRequest $request) {
        $status = Password::sendResetLink($request->only('email'));
        if ($status == Password::RESET_LINK_SENT) {
            return $this->returnSuccessMessage(__($status));
        }
        throw \Illuminate\Validation\ValidationException::withMessages([
            'email'=> [trans($status)],
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request) {
       $status = Password::reset($request->only('email','token', 'password', 'password_confirmation'),
       function ($admin, $password) {
           $admin->forceFill([
               'password' => Hash::make($password)
           ])->setRememberToken(Str::random(60));

           $admin->save();
           $admin->tokens()->delete();

           event(new PasswordReset($admin));
       });

       if ($status == Password::PASSWORD_RESET) {
           return $this->returnSuccessMessage(__($status));
       }
        return $this->returnErrorMessage(__($status), 500);
    }

    public function changePassword(ChangePasswordRequest $request) {
        $user = $request->user();
        if (Hash::check($request->old_password, $user->getAuthPassword())) {
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);
            return $this->returnSuccessMessage('change password success');
        }else {
            return $this->returnErrorMessage('the old password does not match', 403);
        }
    }

}

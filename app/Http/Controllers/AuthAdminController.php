<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Mail\ForgotPasswordMail;
use App\Models\Admin;
use App\Traits\GeneralTrait;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Nette\Schema\ValidationException;
use \Illuminate\Support\Str;
use Exception;

class AuthAdminController extends Controller
{
    public function login(LoginRequest $request){

        $user = Admin::query()->where('email', $request->email)->first();
        if(!isset($user)) {
           return errorResponse('User Not Found', 404);
        }
        if (!Hash::check(request('password'), $user->password)) {
            return errorResponse('Incorrect password', 403);
        }

        $token = $user->createToken('admin', ['admin']);
        $data['admin'] = $user;
        $data['type'] = 'Bearer';
        $data['token'] = $token->accessToken;

        return successResponse($data);
    }

    public function logout() {
        Auth::user()->tokens()->delete();
        return successMessage('logged out successfully');
    }

    public function forgotPassword(ForgotPasswordRequest $request) {
        try {
            $token = Str::random(64);
            $user = DB::table('password_resets')->where('email', $request->email)->update([
                'token' => Hash::make($token)
            ]);
            if (!$user) {
                DB::table('password_resets')->insert([
                    'email' => $request->email,
                    'token' => Hash::make($token),
                    'created_at' => now(),
                ]);
            }
            $url =  config('app.reset_password_url').'?token=' . $token;
            Mail::to($request->email)->send(new ForgotPasswordMail($url));

            return successMessage('Check your email');
        } catch (Exception $exception) {
            return errorResponse($exception->getMessage(),400);
        }
    }

    public function resetPassword(ResetPasswordRequest $request) {
        $email = $request->email;
        $token = $request->token;
        $password = $request->password;
        $resetPasswordToken = DB::table('password_resets')->where('email', $email)->first();
        $admin = Admin::query()->where('email', $email)->first();
        if (isset($resetPasswordToken) && Hash::check($token, $resetPasswordToken->token)) {
            try {
                DB::beginTransaction();
                $admin->update([
                    'password' => Hash::make($password),
                ]);
                $admin->tokens()->delete();
                DB::table('password_resets')->where('email', $email)->delete();
                DB::commit();
            }catch (Exception $exception) {
                DB::rollBack();
                return errorResponse($exception->getMessage(), $exception->getCode());
            }
            return successMessage('reset password successfully');
        }
        return errorResponse('invalid token, please try again', 403);
    }

    public function changePassword(ChangePasswordRequest $request) {
        $user = $request->user();
        if (Hash::check($request->old_password, $user->getAuthPassword())) {
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);
            return successMessage('change password success');
        }else {
            return errorResponse('the old password does not match', 403);
        }
    }

}

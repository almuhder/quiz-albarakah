<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'email', 'password'
    ];

    protected $table = 'admins';
    protected $primaryKey = 'id';

    public function sendPasswordResetNotification($token)
    {

        $url = 'http://127.0.0.1:8000\api\forgot-password?token='. $token;
        $this->notify(new ResetPasswordNotification($url));
    }
}

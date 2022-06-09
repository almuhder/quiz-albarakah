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
    protected $hidden = [
        'password', 'updated_at', 'remember_token'
    ];

    public function sendPasswordResetNotification($token)
    {

        $url = 'http://localhost:3000/admin/reset?token='. $token;
        $this->notify(new ResetPasswordNotification($url));
    }
}

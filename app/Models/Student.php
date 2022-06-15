<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable
{
    use HasFactory, HasApiTokens;


    protected $fillable = [
        'student_code',
        'student_number',
        'status'
    ];

    public function results() {
        return $this->hasMany(Result::class);
    }
}

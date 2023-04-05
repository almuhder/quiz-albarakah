<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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


    protected $casts = [
        'updated_at' => 'date:Y-m-d',
        'created_at' => 'date:Y-m-d',
    ];
    public function results() {
        return $this->hasMany(Result::class);
    }


    public function scopeCount($query) {
        return $query->select(['status', DB::raw('COUNT(students.id) as students')])
            ->groupBy('status');
    }
}


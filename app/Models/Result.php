<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;


    public function studentResult() {
        return $this->belongsTo(Student::class, 'student_id');
    }
}

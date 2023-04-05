<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function questions() {
        return $this->hasMany(Question::class);
    }


    public function scopeCountWithQuestions($query) {
        return $query->select(['name', DB::raw('COUNT(questions.id) as questions')])
            ->join('questions', 'questions.type_id', 'types.id')
            ->groupBy('name');
    }
}

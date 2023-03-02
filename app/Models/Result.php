<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;
    protected $fillable = [
        'score', 'student_id'
    ];
    protected $casts = [
        'updated_at' => 'date:Y-m-d',
        'created_at' => 'date:Y-m-d',
    ];

    public function studentResult() {
        return $this->belongsTo(Student::class, 'student_id');
    }


    public function setScoreAttribute($value)
    {
        $this->attributes['score'] = $this->orderResultByTypes($value);
    }

    private function orderResultByTypes($value) {
        $types = Type::query()->get();
        foreach ($types as $type){
            for ($i = 0; $i < strlen($value); $i+=2) {
                if ($value[$i] == $type->type_name)
                {
                    $data[] = $value[$i].$value[$i+1];
                }
            }
        }
        return implode($data);
    }
}

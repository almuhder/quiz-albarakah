<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id'
    ];
    protected $casts = [
        'updated_at' => 'date:Y-m-d',
        'created_at' => 'date:Y-m-d',
    ];


    public function studentResult() {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function questions() {
        return $this->belongsToMany(
            Question::class,
            'result_question',
            'result_id', 'question_id')->with('type');
    }

    protected $appends = ['result'];
    public function getResultAttribute() {
        $result = $this->groupedQuestionsByType();
        return $result;
    }
    private function groupedQuestionsByType() {
        $results = [];
        $groupedQuestions = $this->questions()->get()->groupBy('type_id');
        foreach ($groupedQuestions as $item) {
            $results[] =  $item[0]->type->name . count($item);
        }
        $result = $this->orderResultByTypes(implode($results));
        return $result;
    }
    private function orderResultByTypes($value) {
        $types = Type::query()->get();
        foreach ($types as $type){
            for ($i = 0; $i < strlen($value); $i+=2) {
                if ($value[$i] == $type->name)
                {
                    $data[] = $value[$i].$value[$i+1];
                }
            }
        }
        return implode($data);
    }
}

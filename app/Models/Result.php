<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
            'result_id',
             'question_id')
             ->withPivot('result_id', 'question_id', 'status')
             ->with('type');
    }

    protected $appends = ['result'];
    public function getResultAttribute() {
        $result = $this->groupedQuestionsByType();
        return $result;
    }
    private function groupedQuestionsByType() {
        $results = [];
        $groupedQuestions = $this->questions()->get()->groupBy('type_id');
        foreach ($groupedQuestions as $key => $items) {
            $results[$key]['type'] =  $items[0]->type->name; 
            $counter = 0; 
            foreach($items as $item) {
                $counter += $item->pivot->status;
            }
            $results[$key]['number'] = $counter;  

        }
        $result = $this->orderResultByTypes($results);
        return $result;
    }

    private function orderResultByTypes($value) {
        $types = Type::query()->get();
        $data = [];
        foreach ($types as $type){
            foreach($value as $item) {
                if ($item['type'] == $type->name)
                {
                    $data[] = $item['type'] . $item['number'];
                }
            }
        }
        return implode($data);
    }
}

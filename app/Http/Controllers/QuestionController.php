<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Question;
use App\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    use GeneralTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = Question::query()->with('type')->get();
        return $this->returnData('data', $questions, 'List Questions');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreQuestionRequest $request)
    {
        try {
            $question = Question::query()->create([
                'question_value'=>$request->question_value,
                'type_id'=>$request->type_id,
            ]);
            return $this->returnData('data', $question, 'added question success');
        }catch (\Exception $exception) {
            return  $exception->getMessage();
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionRequest $request, Question $questionID)
    {
        $questionID->update([
            'question_value' => $request->question_value,
            'type_id' => $request->type_id,
        ]);
        return $this->returnData('data', $questionID, 'updated question success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $questionID)
    {
        $questionID->delete();
        return $this->returnSuccessMessage('deleted question success');
    }
}

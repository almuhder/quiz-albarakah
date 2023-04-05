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
    public function index()
    {
        $questions = Question::query()->with('type')->paginate(20);
        return successResponse($questions);
    }

    public function store(StoreQuestionRequest $request)
    {
        $question = Question::query()->create([
            'content'=>$request->get('content'),
            'type_id'=>$request->type_id,
        ]);
        return successResponse($question);
    }

    public function update(UpdateQuestionRequest $request, Question $question)
    {
        $question->update([
            'content' => $request->get('content'),
        ]);
        return successResponse($question);
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return successResponse(__('general.deleted'));
    }
}

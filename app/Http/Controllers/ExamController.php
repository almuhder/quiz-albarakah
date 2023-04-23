<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResultRequest;
use App\Models\Question;
use App\Models\Result;
use App\Models\Student;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    public function startExam() {
        $questions = Question::query()->get(['id', 'content']);
        return successResponse($questions);
    }

    public function endExam(StoreResultRequest $request)
    {
        $student = auth('student')->user();
        $data = [];
        if ($student->status) {
            try {
                DB::beginTransaction();
                $result = Result::query()->create([
                    'student_id' => $student->id
                ]);
                $result->refresh();
                foreach ($request->questions as $question) {
                        $data[] = [
                            'question_id' => $question['id'],
                            'result_id' => $result->id,
                            'status' => $request->answer,
                        ];
                }
                DB::table('result_question')->insert($data);
                $student->token()->delete();
                $student->update(['status' => false]);
                DB::commit();
            }catch (\Exception $exception) {
                DB::rollBack();
                return errorResponse($exception->getMessage(), $exception->getCode());
            }
            return successResponse($result);
        }
        return errorResponse(__('auth.unauthorized'), 403);
    }

}

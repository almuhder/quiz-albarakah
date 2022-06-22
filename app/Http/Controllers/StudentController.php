<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginStudentRequest;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Result;
use App\Models\Student;
use App\Traits\GeneralTrait;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Null_;

class StudentController extends Controller
{
    use GeneralTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function login(LoginStudentRequest $request)
    {
        $student = Student::query()->where('student_code', $request->student_code)->first();
        if (!isset($student)) {
            return $this->returnErrorMessage('Not Found', 404);
        } elseif ($student->status) {
            return $this->returnErrorMessage('Sorry, you take the quiz before', 403);
        } else {
            $token = $student->createToken('student', ['student']);
            $data['student'] = $student;
            $data['type'] = 'Bearer';
            $data['token'] = $token->accessToken;
            DB::table('oauth_access_tokens')->where('id',$token->token->id)
                ->update([
                    'expires_at' => Carbon::now()->addHour()
                ]);
            return $this->returnData('data', $data, 'logged in successfully');
        }
    }

    public function index(Request $request)
    {
        $students = Student::query();
        $searchByNum = $request->student_number;
        if ($searchByNum !== null) {
            $students->where('student_number', 'LIKE', '%' . $searchByNum . '%');
        }
        $studentQuery = $students->get();
        return $this->returnData('data', $studentQuery, 'List Students');
    }

    public function studentResults()
    {
        $studentResults = Student::query()->with('results')->get();
        return $this->returnData('data', $studentResults, 'List Students With Result');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentRequest $request)
    {
        try {
            $student = Student::query()->create([
                'student_number' => $request->student_number,
                'student_code' => 'S' . rand(10, 99),
                'status' => 0
            ]);
            $student->update([
                'student_code' => 'S' . $student->id . rand(10, 99)
            ]);

            return $this->returnData('data', $student, 'added student success');
        } catch (QueryException $exception) {
            $errorCode = $exception->errorInfo[1];
            if ($errorCode == 1062) {
                return $this->returnErrorMessage('this student already exists', 500);
            }
            return $this->returnErrorMessage('input error', 500);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentRequest $request, Student $studentID)
    {
        try {
            $studentID->update([
                'student_number' => $request->student_number,
            ]);
            return $this->returnData('data', $studentID, 'updated Student Code success');

        } catch (QueryException $exception) {
            $errorCode = $exception->errorInfo[1];
            if ($errorCode == 1062) {
                return $this->returnErrorMessage('this student already exists', 500);
            }
            return $this->returnErrorMessage('input error', 500);
        }

    }

    public function updateStatus(Student $studentID)
    {
        if ($studentID->status) {
            $studentID->update([
                'status' => 0
            ]);
        } else {
            $studentID->update([
                'status' => 1
            ]);
        }
        return $this->
        returnData(
            'data',
            $studentID,
            'updated Status To ' . $studentID->status . ' success'
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $studentID)
    {
        $studentID->delete();
        return $this->returnSuccessMessage('deleted student success');
    }

    public function storeResult(StoreResultRequest $request)
    {
        $student = auth('student')->user();
        if ($student->status == 0) {
                $result = Result::query()->create([
                    'score' => $request->score,
                    'student_id' => auth('student')->id(),
                ]);
                $student->update([
                    'status' => 1
                ]);
                 return $this->returnData('data', $result, 'added result successfully');
        }else {
            return $this->returnErrorMessage('already has result', 403);
        }
    }
}

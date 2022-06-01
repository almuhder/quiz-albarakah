<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginStudentRequest;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Result;
use App\Models\Student;
use App\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Null_;

class StudentController extends Controller
{
    use GeneralTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function login(LoginStudentRequest $request) {
        $student = Student::query()->where('student_code', $request->student_code)->first();
        if (!isset($student)) {
            return $this->returnErrorMessage('Not Found', 404);
        }
        else {

            $token = $student->createToken('student', ['student']);
            $data['student']=$student;
            $data['type']='Bearer';
            $data['token']=$token->accessToken;

            return $this->returnData('data', $data,'logged in successfully');
        }
    }
    public function index()
    {
        $students = Student::query()->get();
        return $this->returnData('data', $students, 'List Students');
    }

    public function studentResults() {
        $studentResults = Student::query()->with('results')->get();
        return $this->returnData('data', $studentResults, 'List Students With Result');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentRequest $request)
    {
        $student = Student::query()->create([
            'student_code' => $request->student_code,
        ]);
        return $this->returnData('data', $student, 'added student success');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentRequest $request, Student $studentID)
    {
        $studentID->update([
            'student_code' => $request->student_code,
        ]);
        return $this->returnData('data', $studentID, 'updated Student Code success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $studentID)
    {
        $studentID->delete();
        return $this->returnSuccessMessage('deleted student success');
    }

    public function storeResult(StoreResultRequest $request)
    {
        if (!Result::query()->where('student_id', $request->student_id)->exists()) {
            $result = Result::query()->create([
                'score' => $request->score,
                'student_id' => auth('student')->id()
            ]);
            return $this->returnData('data', $result, 'added result successfully');
        }else {
            return $this->returnErrorMessage('already has result', 403);
        }
    }

}

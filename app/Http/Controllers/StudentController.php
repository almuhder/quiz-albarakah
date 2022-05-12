<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Traits\GeneralTrait;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Null_;

class StudentController extends Controller
{
    use GeneralTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $students = Student::query();
        $searchByCode = $request->searchByCode;
        if ($searchByCode !== null) {
            $students->where('student_code', 'LIKE', '%'.$searchByCode.'%');
        }
        $studentQuery = $students->get();
        return $this->returnData('data', $studentQuery, 'List Students');
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
    public function store(Request $request)
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
    public function update(Request $request, Student $studentID)
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
}

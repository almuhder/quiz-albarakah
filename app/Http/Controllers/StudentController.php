<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Null_;

class StudentController extends Controller
{
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
        return $studentQuery;
    }

    public function studentResults() {
        $studentResults = Student::query()->with('results')->get();
        return $studentResults;
    }

    public function search() {

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
        return $student;
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
        return $studentID;
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
        return 'success deleted student';
    }
}

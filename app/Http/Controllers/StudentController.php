<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginStudentRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Result;
use App\Models\Student;
use App\Models\Type;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function login(LoginStudentRequest $request)
    {
        $student = Student::query()->where('student_code', $request->student_code)->first();
        if (!isset($student)) {
            return errorResponse('Not Found', 404);
        } elseif (! $student->status) {
            return errorResponse('Sorry, you take the quiz before', 403);
        } else {
            $token = $student->createToken('student', ['student']);
            $data['student'] = $student;
            $data['type'] = 'Bearer';
            $data['token'] = $token->accessToken;
            DB::table('oauth_access_tokens')->where('id',$token->token->id)
                ->update([
                    'expires_at' => Carbon::now()->addHour()
                ]);
            return successResponse($data);
        }
    }

    public function index(Request $request)
    {
        $perPage = $request->query('perPage');
        $students = Student::query();
        $searchByNum = $request->student_number;
        if ($searchByNum !== null) {
            $students->where('student_number', 'LIKE', '%' . $searchByNum . '%');
        }
        $students = $students->paginate($perPage);
        return successResponse($students);
    }

    public function store(StoreStudentRequest $request)
    {
        try {
            DB::beginTransaction();
            $student = Student::query()->create([
                'student_number' => $request->student_number,
                'student_code' => 'S' . rand(10, 99),
                'status' => 1
            ]);
            $student->update([
                'student_code' => 'S' . $student->id . rand(10, 99)
            ]);
            DB::commit();
            return successResponse($student);
        } catch (QueryException $exception) {
            DB::rollBack();
            return errorResponse($exception->getMessage(), $exception->getCode());
        }
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update([
            'student_number' => $request->student_number,
            'student_code' => 'S' . $student->id . rand(10, 99)
        ]);
        return successResponse($student);
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return successResponse(__('general.deleted'));
    }

    public function activateDeactivate(Student $student)
    {
        $student->status ? $student->update(['status' => 0]) :  $student->update(['status' => 1]);
        return successMessage("updated Status To $student->status success");
    }

    public function studentsWithResults() {
        $perPage = \request()->query('perPage');
        $students = Student::query()->with('results')->paginate($perPage);
        return $students;
    }

}

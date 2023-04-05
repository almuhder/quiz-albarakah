<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Setting;
use App\Models\Student;
use App\Models\Type;
use App\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::query()->get();
        return successResponse($settings);
    }

    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'exam_time' => 'required'
        ]);
        $setting->update([
            'exam_time' => $request->exam_time
        ]);
        return successResponse($setting);
    }

    public function statistics() {
        $activeStudents = 0;
        $nonActiveStudents = 0;
        $types = 0;
        $questions = 0;

        $students = Student::count()->get();
        $typesWithCountQuestion = Type::countWithQuestions()->get();

        $students[0]->status ?
            $activeStudents = $students[0]->students & $nonActiveStudents = $students[1]->students :
            $activeStudents = $students[1]->students & $nonActiveStudents = $students[0]->students;

        foreach ($typesWithCountQuestion as $type) {
            $types += 1;
            $questions += $type->questions;
        }
        $data['Students'] =  $activeStudents + $nonActiveStudents;
        $data['ActiveStudents'] =  $activeStudents;
        $data['NonActiveStudents'] =  $nonActiveStudents;
        $data['countTypes'] = $types;
        $data['countQuestions'] = $questions;
        $data['countTypeWithCountQuestion'] = $typesWithCountQuestion;
        return successResponse($data);
    }

}

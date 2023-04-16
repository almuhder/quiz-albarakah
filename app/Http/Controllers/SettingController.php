<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Setting;
use App\Models\Student;
use App\Models\Type;
use Illuminate\Http\Request;
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

    public function statistics()
    {
        $activeStudents = DB::table('students')->where('status', 1)->count();
        $nonActiveStudents = DB::table('students')->where('status', 0)->count();
        $typesWithCountQuestion = Type::query()->withCount('questions')->get();
        $questions = Question::query()->count('id');
        $types = Type::query()->count('id');


        $data['Students'] = $activeStudents + $nonActiveStudents;
        $data['ActiveStudents'] = $activeStudents;
        $data['NonActiveStudents'] = $nonActiveStudents;
        $data['countTypes'] = $types;
        $data['countQuestions'] = $questions;
        $data['typesWithCountQuestion'] = $typesWithCountQuestion;
        return successResponse($data);
    }

}

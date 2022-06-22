<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Setting;
use App\Models\Student;
use App\Models\Type;
use App\Traits\GeneralTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class SettingController extends Controller
{
    use GeneralTrait;
    public function index()
    {
        $settings = Setting::query()->get();
        return $this->returnData('settings', $settings, 'all settings');
    }
    public function update(Request $request, Setting $setting)
    {

        $setting->update([
            'exam_time' => $request->exam_time
        ]);
        return $this->returnData('settings', $setting, 'updated exam time success');
    }

    public function statistics() {
        $countStudents = Student::query()->count('*');
        $countActiveStudents = Student::query()->where('status', 1)->count('*');
        $countNonActiveStudents = Student::query()->where('status', 0)->count('*');
        $countQuestions = Question::query()->count('*');
        $countTypes = Type::query()->count('*');
        $countTypeWithCountQuestion = Type::query()->withcount('questions')->get();

        $data['countStudents'] = $countStudents;
        $data['countActiveStudents'] = $countActiveStudents;
        $data['countNonActiveStudents'] = $countNonActiveStudents;
        $data['countQuestions'] = $countQuestions;
        $data['countTypes'] = $countTypes;
        $data['countTypeWithCountQuestion'] = $countTypeWithCountQuestion;
        return $this->returnData('data', $data, "list of some number");

    }

}

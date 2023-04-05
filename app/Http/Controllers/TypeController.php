<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;
use App\Models\Type;
use App\Traits\GeneralTrait;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function index()
    {
        $types = Type::query()->get();
        return successResponse($types);
    }

    public function store(StoreTypeRequest $request)
    {
        $type = Type::query()->create([
            'name' => $request->name,
        ]);
        return successResponse($type);
    }

    public function update(UpdateTypeRequest $request, Type $type)
    {
            $type->update([
                'name'=>$request->name,
            ]);
           return successResponse($type);
    }

    public function destroy(Type $type)
    {
        $type->delete();
        return successMessage(__('general.deleted'));
    }
}

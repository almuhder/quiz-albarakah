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
    use GeneralTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = Type::query()->get();
        return $this->returnData('data', $types, 'List Types');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTypeRequest $request)
    {
        try {
            $type = Type::query()->create([
                'type_name'=>$request->type_name,
            ]);
            return $this->returnData('data', $type, 'added type success');
        }catch (QueryException $exception) {
            $errorCode = $exception->errorInfo[1];
            if($errorCode == 1062){
                return $this->returnErrorMessage('this type already exists', 500);
            }
            return $this->returnErrorMessage('input error', 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(UpdateTypeRequest $request, Type $typeID)
    {
        try {
            $typeID->update([
                'type_name'=>$request->type_name,
            ]);
            return $this->returnData('data', $typeID, 'updated type success');
        }catch (QueryException $exception) {
            $errorCode = $exception->errorInfo[1];
            if($errorCode == 1062){
                return $this->returnErrorMessage('this type already exists', 500);
            }
            return $this->returnErrorMessage('input error', 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Type $typeID)
    {
        $typeID->delete();
        return $this->returnSuccessMessage('deleted type success');
    }
}

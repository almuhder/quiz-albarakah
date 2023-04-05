<?php

if (!function_exists('successResponse')) {
    function successResponse($data = [])
    {
        return response()->json(['status' => __('general.success'), 'data' => $data]);
    }
}
if (!function_exists('errorResponse')) {
    function errorResponse($message, $statusNum)
    {
        return response()->json([
            'status' => __('general.error'),
            'message' => $message
        ], $statusNum);
    }
}
if (!function_exists('successMessage')) {
    function successMessage($message)
    {
        return response()->json([
            'status' => __('general.success'),
            'message' => $message
        ]);
    }
}



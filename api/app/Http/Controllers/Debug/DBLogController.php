<?php

namespace App\Http\Controllers\Debug;

use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Http\Request;

class DBLogController extends Controller
{
    public function index()
    {
        $logFile = file(storage_path() . '/logs/laravel.log');
        $logs = array_map(fn($log) => htmlspecialchars($log), $logFile);
        return response()->json($logs);
    }
}

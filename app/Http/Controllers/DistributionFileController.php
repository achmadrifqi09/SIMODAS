<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class DistributionFileController extends Controller
{
    public function __invoke($file)
    {
        
        // abort_if(auth()->guest(), Response::HTTP_FORBIDDEN);
        $path = "file-bast/$file";
        return response()->file(
            Storage::path($path)
        );
    }
}

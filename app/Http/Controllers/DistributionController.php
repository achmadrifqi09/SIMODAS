<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DistributionController extends Controller
{
    public function index () {
        return Inertia::render(
            'Distribution/DashboardDistribution'
        );
    }

    public function create () {
        return Inertia::render(
            'Distribution/DistributionForm'
        );
    }
}


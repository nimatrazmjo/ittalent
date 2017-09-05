<?php

namespace App\Http\Controllers;

use App\TransactionModel;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $transaction = TransactionModel::all();
        return view('home');
    }

    public function api()
    {
        $content = TransactionModel::orderByRaw("RAND()")->limit(10)->get();
        return response($content)
            ->header('Content-Type', 'Application/json')
            ->header('X-Header-One', 'Header Value')
            ->header('X-Header-Two', 'Header Value');
    }
}

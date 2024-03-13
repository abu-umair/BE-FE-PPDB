<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class Search_navbarController extends Controller
{
    public function search(Request $request)
    {
        $inputSearch = $request['inputSearch'];
        $keyTeacher = Teacher::where('name', 'LIKE', '%'.$inputSearch.'%')
        ->get();

        $keyResultAll = $keyTeacher; 
        echo $keyResultAll;

    }

    public function credits()
    {
        return view('pages.admin.etc.credits');
        
    }
}

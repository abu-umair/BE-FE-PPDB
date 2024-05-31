<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required',
            'file' => 'nullable|file|max:10240', // max file size 10MB
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('uploads', 'public');
        }

        $announcement = new Announcement();
        $announcement->message = $request->message;
        $announcement->file_path = $filePath;
        $announcement->save();

        return response()->json(['message' => 'Announcement created successfully'], 201);
    }
}

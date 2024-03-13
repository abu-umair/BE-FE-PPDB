<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class Notification_navbarController extends Controller
{
    public function fetchnotification()
    {
        $notifications_all = Notification::orderBy('created_at', 'desc')->get()->take(15);

        $notifications = [];
        foreach ($notifications_all as $notification) {
            $notification['created_at_convert'] = $notification->created_at ? $notification->created_at->diffForHumans() : '-'; 
            $notifications[]=$notification;
        }
        // dd($notifications);
        return response()->json([
            'notifications' => $notifications,
        ]);
    }

    public function updateclick()
    {
        $notifclick = Notification::where('read_at',null)->update(['read_at' => now()]);
        return response()->json([
            'notifclick' => $notifclick,
        ]);
    }

    public function countnotif()
    {
        $notifcount = Notification::where('read_at',null)->count();
        return response()->json([
            'notifcount' => $notifcount,
        ]);
    }
}

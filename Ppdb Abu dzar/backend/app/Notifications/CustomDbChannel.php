<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\AnonymousNotifiable;

// kirim notifications table
class CustomDbChannel 
{
    public function send($notifiable, Notification $notification)
  {
    $data = $notification->toDatabase($notifiable);

    // dd($notifiable);

    return $notifiable->routeNotificationFor('database')->create([
        // 'id' => $notification->id,

        //customize here
        //'merchants_id' => $data['merchants_id'], //<-- comes from toDatabase() Method below
        // 'user_id'=> \Auth::user()->id,

        'type' => get_class($notification),
        'datas' => $data['datas'],
        'from' => $data['from'],
        'read_at' => null,
    ]);
  }
}

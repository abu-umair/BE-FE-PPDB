<?php

namespace App\Jobs;

use App\Models\Teacher;
use App\Notifications\NotificationBackend;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;

class teacherJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dataRequest;

    public function __construct($dataRequest)
    {
        $this->dataRequest = $dataRequest;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $data = $this->dataRequest;
        
        $item = Teacher::create($data);
    
        // Notification Start
        $enrollmentData = [
            'datas'               => 'New user ',
            'from'                => strtok($item->name, " "),
            // 'from'                => $items_customers->name,
            // 'merchants_id'         => $this->dataRequest->adfood_merchants_id,
            // 'merchants_id'         => $items_customers->id,
        ];
        $item->notify(new NotificationBackend($enrollmentData));
        // Notification::send($item, new NotificationBackend($enrollmentData));
        // Notification End
        
    }
}

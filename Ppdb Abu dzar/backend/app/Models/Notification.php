<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    // use SoftDeletes;

    protected $fillable = [
        'id','type','from','read_at'
    ];

    protected $hidden =[

    ];
}

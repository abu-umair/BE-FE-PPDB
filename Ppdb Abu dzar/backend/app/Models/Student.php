<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function user()
    {
        return $this->belongsTo(User_custom::class, 'users_id', 'id');
    }
}

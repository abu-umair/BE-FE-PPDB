<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Evaluasi_story extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    public function story_library()
    {
        return $this->belongsTo(Story_library::class, 'story_libraries_id', 'id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Librarystory_user extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    public function story_library()
    {
        return $this->belongsTo(Story_library::class, 'story_libraries_id', 'id');
    }

    public function evaluasi_story()
    {
        return $this->hasMany(Evaluasi_story::class, 'story_libraries_id', 'id');
    }

    public function url_story()
    {
        return $this->hasMany(Url_story::class, 'story_libraries_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}

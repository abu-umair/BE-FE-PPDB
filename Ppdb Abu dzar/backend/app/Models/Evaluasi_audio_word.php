<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Evaluasi_audio_word extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    public function word_library()
    {
        return $this->belongsTo(Word_library::class, 'word_libraries_id', 'id');

    }
}

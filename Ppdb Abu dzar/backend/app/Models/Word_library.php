<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Word_library extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    public function evaluasi_word()
    {
        return $this->hasMany(Evaluasi_word::class, 'word_libraries_id', 'id');
    }

    public function evaluasi_audio_word()
    {
        return $this->hasMany(Evaluasi_audio_word::class, 'word_libraries_id', 'id');
    }
}

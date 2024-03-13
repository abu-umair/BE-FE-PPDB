<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    // public function transaction()
    // {
    //     return $this->hasMany(Transaction::class, 'products_id', 'id');
    // }

    // public function evaluasi_audio_word()
    // {
    //     return $this->hasMany(Evaluasi_audio_word::class, 'word_libraries_id', 'id');
    // }
}

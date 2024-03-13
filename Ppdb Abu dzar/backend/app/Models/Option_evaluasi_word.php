<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Option_evaluasi_word extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    public function option_evaluasi_word()
    {
        return $this->belongsTo(Evaluasi_word::class, 'evaluasi_words_id', 'id');
    }
}

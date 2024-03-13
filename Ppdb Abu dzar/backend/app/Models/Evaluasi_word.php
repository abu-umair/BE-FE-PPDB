<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Evaluasi_word extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];
    
    // method Aksesors
    public function getOptionsAttribute($value)
    {
        return json_decode($value); 
    }

    public function word_library()
    {
        return $this->belongsTo(Word_library::class, 'word_libraries_id', 'id');
    }

    // public function option_evaluasi_word()
    // {
    //     return $this->hasMany(Option_evaluasi_word::class, 'evaluasi_words_id', 'id');
    // }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    

    public function user()
    {
        return $this->belongsTo(User_custom::class, 'users_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id');
    }

    
}

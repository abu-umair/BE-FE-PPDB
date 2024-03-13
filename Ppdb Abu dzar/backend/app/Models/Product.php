<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // protected $table = 'users';

    protected $guarded = [];

    public function transaction()
    {
        return $this->hasMany(Transaction::class, 'products_id', 'id');
    }

    public function purchase_card()
    {
        return $this->hasMany(Purchase_card::class, 'products_id', 'id');
    }
}

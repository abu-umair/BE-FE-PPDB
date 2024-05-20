<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;;

use Illuminate\Database\Eloquent\Model;

class User_custom extends Model
{
    use HasFactory;

    protected $table = 'users';

    // method Aksesors
    public function getPasswordAttribute($value)
    {
        return null;
    }

    protected $guarded = [];

    public function student()
    {
        return $this->hasOne(Student::class, 'users_id', 'id');
    }

    public function transaction()
    {
        return $this->hasMany(Transaction::class, 'users_id', 'id');
    }

    public function purchase_card()
    {
        return $this->hasMany(Purchase_card::class, 'users_id', 'id');
    }

    // Relasi Self Join
    public function owner()
    {
        return $this->belongsTo(User_custom::class, 'ownership_id');
    }

    public function staff()
    {
        return $this->hasMany(User_custom::class, 'ownership_id');
    }
    // protected $fillable = [
    //     'image',
    //     'email_verified_at',
    //     'name',
    //     'email',
    //     'password',
    //     'created_at',
    //     'roles',
    //     'phone',
    //     'gender',
    //     'dob',
    //     'address',
    //     'long',
    //     'lat',
    //     'jumlah_hafalan',
    //     'sanad',
    //     'online',
    //     'offline',
    // ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory, Notifiable;
    
    protected $table = 'users';

    // protected $guarded = []; 
    protected $fillable = [
        'image',
        'email_verified_at',
        'name',
        'email',
        'password',
        'created_at',
        'roles',
        'phone',
        'gender',
        'dob',
        'address',
        'long',
        'lat',
        'jumlah_hafalan',
        'sanad',
        'online',
        'offline',
    ];

}

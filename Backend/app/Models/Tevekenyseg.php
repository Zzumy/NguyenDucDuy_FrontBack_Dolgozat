<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tevekenyseg extends Model
{
    use HasFactory;
    protected  $primaryKey = 'tevekenyseg_id';
    protected $fillable = [
        'tevekenyseg_nev',
        'pontszam',
    ];
}

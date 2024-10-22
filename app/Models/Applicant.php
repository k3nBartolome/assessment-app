<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Applicant extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'applicant';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'question1',
        'question2',
        'question3',
        'question4',
        'question1_start',
        'question2_start',
        'question3_start',
        'question4_start',
        'question1_end',
        'question2_end',
        'question3_end',
        'question4_end',
    ];
}

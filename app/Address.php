<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    public function street()
    {
        return $this->hasMany('App\Street','address_id');
    }
}

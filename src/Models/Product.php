<?php


namespace App\Models;

abstract class Product extends BaseModel
{

    abstract public function all();

    abstract public function show($id);
}

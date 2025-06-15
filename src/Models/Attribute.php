<?php

namespace App\Models;

abstract class Attribute extends BaseModel
{
    abstract public function fetchProductAttributes();
}

<?php

namespace App\Models;

class AttributeQuery
{
    public static function get(): array
    {
        $attributes = new DBAttribute();
        return $attributes->fetchProductAttributes();
    }
}

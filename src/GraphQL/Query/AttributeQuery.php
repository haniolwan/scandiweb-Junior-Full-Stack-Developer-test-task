<?php

namespace App\GraphQL\Query;

use App\Models\DBAttribute;

class AttributeQuery
{
    public static function get(): array
    {
        $attributes = new DBAttribute();
        return $attributes->fetchProductAttributes();
    }
}

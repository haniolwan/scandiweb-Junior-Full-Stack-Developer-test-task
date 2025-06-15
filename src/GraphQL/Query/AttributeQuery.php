<?php

namespace App\GraphQL\Query;

use App\Models\DBAttribute;

class AttributeQuery
{
    public static function get($id): array
    {
        $attributes = new DBAttribute();
        return $attributes->fetchProductAttributes($id);
    }
}

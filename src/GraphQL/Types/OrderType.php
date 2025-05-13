<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'product_id' => Type::nonNull(Type::id()),
                'currency_label' => Type::nonNull(Type::string()),
                'price' => Type::nonNull(Type::float()),
                'quantity' => Type::nonNull(Type::int()),
                'attribute_item_ids' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}

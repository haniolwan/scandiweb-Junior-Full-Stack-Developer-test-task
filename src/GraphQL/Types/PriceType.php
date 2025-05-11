<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'amount' => Type::nonNull(Type::float()),
                'currency' => [
                    'type' => new CurrencyType(),
                ],
            ]

        ]);
    }
}

<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::boolean(),
                'gallery' => [
                    'type' => Type::listOf(Type::string()),
                ],
                'description' => Type::string(),
                'price' => Type::float(),
                // 'category' => [
                //     'type' => function () {
                //         return new CategoryType();
                //     },
                //     'resolve' => function ($product) {
                //         return $product['category'];
                //     },
                // ],
                // 'attributes' => [
                //     'type' => Type::listOf(new AttributeType()),
                //     'resolve' => function ($product) {
                //         return $product['attributes'];
                //     },
                // ],
                // 'prices' => [
                //     'type' => Type::listOf(new PriceType()),
                //     'resolve' => function ($product) {
                //         return $product['prices'];
                //     },
                // ],
                'brand' => Type::string(),
            ],
        ]);
    }
}

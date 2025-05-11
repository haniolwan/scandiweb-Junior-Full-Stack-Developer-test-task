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
                'inStock' => Type::nonNull(Type::boolean()),
                'gallery' => [
                    'type' => Type::nonNull(Type::listOf(Type::string())),
                ],
                'description' => Type::nonNull(Type::string()),
                'price' => Type::float(),
                'category' => [
                    'type' => new CategoryType(), // circular deps? use lazy loading if needed
                    'resolve' => function ($product) {
                        return $product['category'];
                    },
                ],
                'attributes' => [
                    'type' => Type::listOf(Type::nonNull(new AttributeType())),
                    'resolve' => function ($product) {
                        return $product['attributes'];
                    },
                ],
                'prices' => [
                    'type' => Type::listOf(Type::nonNull(new PriceType())),
                    'resolve' => function ($product) {
                        return $product['prices'];
                    },
                ],
                'brand' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}

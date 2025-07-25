<?php

namespace App\GraphQL\Types;

use App\GraphQL\Query\AttributeQuery;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Throwable;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::nonNull(Type::boolean()),
                'gallery' => [
                    'type' => Type::listOf(Type::nonNull(Type::string())),
                ],
                'description' => Type::string(),
                'category' => [
                    'type' => Type::string(),
                    'resolve' => function ($product) {
                        return $product['category'];
                    },
                ],
                'attributes' => [
                    'type' => Type::listOf(Type::nonNull(new AttributeSetType())),
                    'resolve' => function ($root) {
                        try {
                            return AttributeQuery::get($root['id']);
                        } catch (Throwable $e) {
                            return $e;
                        }
                    }
                ],
                'prices' => [
                    'type' => Type::listOf(Type::nonNull(new PriceType())),
                    'resolve' => function ($product) {
                        return $product['prices'];
                    },
                ],
                'brand' => Type::string(),
            ],
        ]);
    }
}

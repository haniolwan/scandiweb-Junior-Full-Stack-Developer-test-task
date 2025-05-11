<?php

use App\Factories\ProductControllerFactory;
use GraphQL\Type\Definition\Type;

class ProductQuery
{
    public static function get()
    {
        return [
            'type' => Type::listOf(new ProductType()),
            'resolve' => function () {
                $controller = ProductControllerFactory::create();
                return $controller->index();
            }
        ];
    }
}

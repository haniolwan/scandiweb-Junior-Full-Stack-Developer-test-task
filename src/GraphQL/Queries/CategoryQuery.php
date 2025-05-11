<?php

use App\Factories\CategoryControllerFactory;
use GraphQL\Type\Definition\Type;

class CategoryQuery
{
    public static function get()
    {
        return [
            'type' => Type::listOf(new ProductType()),
            'resolve' => function () {
                $controller = CategoryControllerFactory::create();
                return $controller->index();
            }
        ];
    }
}

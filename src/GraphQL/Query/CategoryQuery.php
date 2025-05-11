<?php

namespace App\GraphQL\Query;

use App\Factories\CategoryControllerFactory;
use App\GraphQL\Types\CategoryType;
use GraphQL\Type\Definition\Type;

class CategoryQuery
{
    public static function get()
    {
        return [
            'type' => Type::listOf(new CategoryType()),
            'resolve' => function () {
                $controller = CategoryControllerFactory::create();
                return $controller->index();
            }
        ];
    }
}

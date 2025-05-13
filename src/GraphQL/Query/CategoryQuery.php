<?php

namespace App\GraphQL\Query;

use App\Factories\CategoryControllerFactory;

class CategoryQuery
{
    public static function get(): array
    {
        $controller = CategoryControllerFactory::create();
        return $controller->index();
    }
}

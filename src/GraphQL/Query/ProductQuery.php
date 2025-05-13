<?php

namespace App\GraphQL\Query;

use App\Factories\ProductControllerFactory;
use App\GraphQL\Types\ProductType;
use GraphQL\Type\Definition\Type;

class ProductQuery
{
    public static function get()
    {
        $controller = ProductControllerFactory::create();
        return $controller->index();
    }

    public static function find($id)
    {
        $controller = ProductControllerFactory::create();
        return $controller->show($id);
    }
}

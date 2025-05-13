<?php

namespace App\GraphQL\Query;

use App\Factories\OrderControllerFactory;

class OrderQuery
{
    public static function get(): int
    {
        $controller = OrderControllerFactory::create();
        return $controller->save();
    }
}

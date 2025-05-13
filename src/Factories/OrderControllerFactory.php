<?php

namespace  App\Factories;

use App\Controllers\OrderController;
use App\Services\OrderService;

class OrderControllerFactory
{
    public static function create(): OrderController
    {
        $service = new OrderService();
        return new OrderController($service);
    }
}

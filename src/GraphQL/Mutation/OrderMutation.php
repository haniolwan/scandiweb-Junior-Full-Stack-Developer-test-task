<?php

namespace App\GraphQL\Mutation;

use App\Models\Order;

class OrderMutation
{
    public static function createOrder($products)
    {
        $order = new Order();
        return $order->createOrderWithItems($products);
    }
}

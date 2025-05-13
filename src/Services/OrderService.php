<?php

namespace App\Services;

use App\Models\Order;

class OrderService extends Order
{
    private Order $order;

    public function __construct()
    {
        $this->order = new Order();
    }

    public function save()
    {
        return $this->order->save();
    }
}

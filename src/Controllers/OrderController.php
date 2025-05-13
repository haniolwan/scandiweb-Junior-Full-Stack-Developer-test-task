<?php

namespace App\Controllers;

use App\Services\OrderService;
use App\Utils\Response;

class OrderController
{
    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function save()
    {
        try {
            return $this->orderService->save();
        } catch (\Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }
}

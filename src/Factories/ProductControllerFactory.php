<?php

namespace  App\Factories;

use App\Controllers\ProductController;
use App\Services\ProductService;

class ProductControllerFactory
{
    public static function create(): ProductController
    {
        $service = new ProductService();
        return new ProductController($service);
    }
}

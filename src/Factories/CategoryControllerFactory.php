<?php

namespace  App\Factories;

use App\Controllers\CategoryController;
use App\Services\CategoryService;

class CategoryControllerFactory
{
    public static function create(): CategoryController
    {
        $service = new CategoryService();
        return new CategoryController($service);
    }
}

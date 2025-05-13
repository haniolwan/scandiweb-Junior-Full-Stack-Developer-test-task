<?php

namespace App\Controllers;

use App\Services\ProductService;
use App\Utils\Response;

class ProductController
{

    private $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        try {
            $products = $this->productService->all();
            return $products;
        } catch (\Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }
}

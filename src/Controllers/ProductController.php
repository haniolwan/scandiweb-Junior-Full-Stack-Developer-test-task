<?php

namespace App\Controllers;

use App\Services\ProductService;
use App\Utils\Response;
use Exception;

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
            // return Response::success('Error: ', $products)->toJson();
        } catch (Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $product = $this->productService->show($id);
            return $product;
        } catch (Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }
}

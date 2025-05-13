<?php

namespace App\Controllers;

use App\Services\CategoryService;
use App\Utils\Response;

class CategoryController
{

    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        try {
            $categories = $this->categoryService->all();
            return $categories;
            // return Response::success('', $categories)->toJson();
        } catch (\Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }
}

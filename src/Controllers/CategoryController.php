<?php

namespace App\Controllers;

use App\Models\DBCategory;
use App\Services\CategoryService;
use App\Utils\Response;

class CategoryController
{
    public function index()
    {
        try {
            $categoryService = new CategoryService();
            $categories = $categoryService->all();
            return Response::success('', $categories)->toJson();
        } catch (\Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }
}

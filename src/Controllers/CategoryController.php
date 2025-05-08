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
            $ct_service = new CategoryService(new DBCategory());
            $categories = $ct_service->all();
            return Response::success('Categories fetched successfully', $categories);
        } catch (\Exception $error) {
            return Response::error('Error: ' . $error->getMessage());
        }
    }
}

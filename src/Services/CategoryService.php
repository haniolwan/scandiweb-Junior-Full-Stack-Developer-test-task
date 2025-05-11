<?php

namespace App\Services;

use App\Models\Category;
use App\Models\DBCategory;

class CategoryService extends Category
{
    private DBCategory $category;

    public function __construct()
    {
        $this->category = new DBCategory();
    }

    public function all()
    {
        return $this->category->all();
    }
}

<?php

namespace App\Services;

use App\Models\Category;
use PDO;

class CategoryService extends Category
{
    protected Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function all()
    {
        return $this->category->all();
    }
}

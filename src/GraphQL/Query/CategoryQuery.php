<?php

namespace App\GraphQL\Query;

use App\Factories\CategoryControllerFactory;
use App\Models\DBCategory;

class CategoryQuery
{
    public static function get(): array
    {
        $categories = new DBCategory();
        return $categories->all();
    }
}

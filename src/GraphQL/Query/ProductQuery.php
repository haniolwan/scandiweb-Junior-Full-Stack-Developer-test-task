<?php

namespace App\GraphQL\Query;

use App\Factories\ProductControllerFactory;
use App\Models\DBProduct;

class ProductQuery
{
    public static function get()
    {
        $product = new DBProduct();
        return $product->all();
    }

    public static function find($id)
    {
        $product = new DBProduct();
        return $product->show($id);
    }
}

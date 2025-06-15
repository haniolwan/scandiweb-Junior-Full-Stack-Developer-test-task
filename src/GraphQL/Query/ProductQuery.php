<?php

namespace App\GraphQL\Query;

use App\Factories\ProductControllerFactory;
use App\Models\DBProduct;

class ProductQuery
{
    public static function get()
    {
        $product = new DBProduct();
        $product->all();
    }

    public static function find($id)
    {
        $product = new DBProduct();
        $product->show($id);
    }
}

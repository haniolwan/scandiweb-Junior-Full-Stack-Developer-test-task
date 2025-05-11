<?php

namespace App\Services;

use App\Models\Product;
use App\Models\DBProduct;

class ProductService extends Product
{
    private DBProduct $product;

    public function __construct()
    {
        $this->product = new DBProduct();
    }

    public function all()
    {
        return $this->product->all();
    }

    public function show($id)
    {
        // get params
        return $this->product->show($id);
    }
}

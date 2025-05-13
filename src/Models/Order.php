<?php

namespace App\Models;

use App\Models\BaseModel;

class Order extends BaseModel
{

    public function save()
    {
        $stmt = $this->db->query("INSERT INTO orders (id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)");
    }
}

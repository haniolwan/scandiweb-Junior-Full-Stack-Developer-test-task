<?php

namespace App\Models;

use App\Models\BaseModel;

class Order extends BaseModel
{
    public int $id;
    public string $product_id;
    public string $currency_label;
    public float $price;
    public string $quantity;
    public string $attribute_item_ids;

    public function save()
    {
        $stmt = $this->db->prepare("INSERT INTO orders 
                (product_id, currency_label, price, quantity, attribute_item_ids, created_at) 
                VALUES (:product_id, :currency_label, :price, :quantity, :attribute_item_ids, :created_at)");

        $stmt->execute([
            ':product_id' => $this->product_id,
            ':currency_label' => $this->currency_label,
            ':price' => $this->price,
            ':quantity' => $this->quantity,
            ':attribute_item_ids' => json_encode($this->attribute_item_ids),
            ':created_at' => date('Y-m-d H:i:s'),
        ]);

        $this->id = $this->db->lastInsertId();
        return $this->id;
    }
}

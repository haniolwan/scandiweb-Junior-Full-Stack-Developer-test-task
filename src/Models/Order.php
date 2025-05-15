<?php

namespace App\Models;

use App\Models\BaseModel;
use PDOException;

class Order extends BaseModel
{
    public int $id;
    public string $order_id;
    public string $product_id;
    public string $currency_label;
    public float $price;
    public string $quantity;
    public string $attribute_item_ids;
    public string $customer_id;

    public function createOrderWithItems(array $products)
    {
        try {
            $this->db->beginTransaction();

            $orderId = $this->createOrder();

            foreach ($products as $product) {
                $this->createOrderItem($orderId, $product);
            }

            $this->db->commit();
            return $orderId;
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    private function createOrder()
    {
        $stmt = $this->db->prepare("
            INSERT INTO orders (customer_id, created_at)
            VALUES (:customer_id, NOW())
        ");
        $stmt->execute([
            ':customer_id' => $this->customer_id ?? 'customer_1',
        ]);
        return $this->db->lastInsertId();
    }

    private function createOrderItem($orderId, $product)
    {
        $stmt = $this->db->prepare("
            INSERT INTO order_items 
            (order_id, product_id, currency_label, price, quantity, attribute_item_ids)
            VALUES 
            (:order_id, :product_id, :currency_label, :price, :quantity, :attribute_item_ids)
        ");

        $stmt->execute([
            ':order_id' => $orderId,
            ':product_id' => $product['product_id'],
            ':currency_label' => $product['currency_label'],
            ':price' => $product['price'],
            ':quantity' => $product['quantity'],
            ':attribute_item_ids' => json_encode($product['attribute_item_ids']),
        ]);
    }
}

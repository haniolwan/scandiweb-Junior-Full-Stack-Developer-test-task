<?php

namespace App\Models;

use App\Models\Product;
use PDO;

class DBProduct extends Product
{
    private function fetchPrices($id = null)
    {
        $sql = "
            SELECT 
                pr.product_id,
                pr.amount,
                c.label AS currency_label,
                c.symbol AS currency_symbol
            FROM prices pr
            LEFT JOIN currencies c ON pr.currency_label = c.label
        ";

        if ($id !== null) {
            $sql .= " WHERE pr.product_id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->db->query($sql);
        }

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $prices = [];

        foreach ($rows as $row) {
            $productId = $row['product_id'];
            $price = [
                'amount' => (float)$row['amount'],
                'currency' => [
                    'label' => $row['currency_label'],
                    'symbol' => $row['currency_symbol'],
                    '__typename' => 'Currency',
                ],
                '__typename' => 'Price',
            ];

            $prices[$productId][] = $price;
        }

        return $id !== null ? ($prices[$id] ?? []) : $prices;
    }



    private function fetchProductRows($id = null)
    {
        $sql = "
            SELECT 
                p.*, 
                g.url AS gallery_image,
                c.name AS category
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN galleries g ON p.id = g.product_id
        ";

        if ($id !== null) {
            $sql .= " WHERE p.id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->db->query($sql);
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function formatProduct($rows, $prices, $attributes)
    {
        if (empty($rows)) {
            return null;
        }

        $productId = $rows[0]['id'];
        $product = [
            'id' => $productId,
            'name' => $rows[0]['name'],
            'inStock' => (bool)$rows[0]['inStock'],
            'gallery' => [],
            'description' => $rows[0]['description'],
            'prices' => $prices,
            'category' => $rows[0]['category'],
            'brand' => $rows[0]['brand'],
            'attributes' => array_values($attributes),
        ];

        foreach ($rows as $row) {

            if (!empty($row['gallery_image']) && !in_array($row['gallery_image'], $product['gallery'])) {
                $product['gallery'][] = $row['gallery_image'];
            }
        }

        return $product;
    }

    public function all()
    {
        $prices = $this->fetchPrices();
        $attrService = new DBAttribute();
        $attributes = $attrService->fetchProductAttributes();
        $rows = $this->fetchProductRows();

        $groupedRows = [];

        foreach ($rows as $row) {
            $productId = $row['id'];
            if (!$productId) {
                continue;
            }
            $groupedRows[$productId][] = $row;
        }

        $products = [];

        foreach ($groupedRows as $productId => $productRows) {
            $products[$productId] = $this->formatProduct(
                $productRows,
                $prices[$productId] ?? [],
                $attributes[$productId] ?? []
            );
        }

        return array_values($products);
    }

    public function show($id)
    {
        $prices = $this->fetchPrices($id);
        $attrService = new DBAttribute($id);
        $attributes = $attrService->fetchProductAttributes($id);
        $rows = $this->fetchProductRows($id);

        return $this->formatProduct($rows, $prices, $attributes);
    }
}

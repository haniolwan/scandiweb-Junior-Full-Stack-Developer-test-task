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

    private function fetchAttributesWithItems($id = null)
    {
        $sql = "
            SELECT
                pa.product_id,
                att.id AS attribute_id,
                att.name AS attribute_name,
                att.type AS attribute_type,
                att_items.id AS item_id,
                att_items.value,
                att_items.displayValue
            FROM product_attributes pa
            LEFT JOIN attributes att ON pa.attribute_id = att.id
            LEFT JOIN product_attribute_items pai 
                ON pa.product_id = pai.product_id 
                AND pa.attribute_id = pai.attribute_id
            LEFT JOIN attribute_items att_items ON pai.attribute_item_id = att_items.id
        ";

        if ($id !== null) {
            $sql .= " WHERE pa.product_id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute(['id' => $id]);
        } else {
            $stmt = $this->db->query($sql);
        }

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $attributes = [];

        foreach ($rows as $row) {
            $productId = $row['product_id'];
            $attrId = $row['attribute_id'];
            $itemId = $row['item_id'];

            if (!isset($attributes[$productId][$attrId])) {
                $attributes[$productId][$attrId] = [
                    'id' => $row['attribute_name'],
                    'name' => $row['attribute_name'],
                    'type' => $row['attribute_type'],
                    'items' => [],
                    '__typename' => 'AttributeSet',
                ];
            }

            if (!isset($attributes[$productId][$attrId]['items'][$itemId])) {
                $attributes[$productId][$attrId]['items'][$itemId] = [
                    'id' => $itemId,
                    'value' => $row['value'],
                    'displayValue' => $row['displayValue'],
                    '__typename' => 'Attribute',
                ];
            }
        }

        foreach ($attributes as &$attrGroup) {
            foreach ($attrGroup as &$attribute) {
                $attribute['items'] = array_values($attribute['items']);
            }
        }

        return $id !== null ? ($attributes[$id] ?? []) : $attributes;
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
        $attributes = $this->fetchAttributesWithItems();
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
        $attributes = $this->fetchAttributesWithItems($id);
        $rows = $this->fetchProductRows($id);

        return $this->formatProduct($rows, $prices, $attributes);
    }
}

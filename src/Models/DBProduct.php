<?php

namespace App\Models;

use App\Models\Product;
use PDO;

class DBProduct extends Product
{
    public function all()
    {
        $stmt = $this->db->query("
        SELECT 
            p.*, 
            g.url AS gallery_image,
            c.name AS category
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN galleries g ON p.id = g.product_id
        ");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $currStmt = $this->db->query("
        SELECT 
            pr.product_id,
            pr.amount,
            c.label AS currency_label,
            c.symbol AS currency_symbol
        FROM prices pr
        LEFT JOIN currencies c ON pr.currency_label = c.label
    ");
        $currencyRows = $currStmt->fetchAll(PDO::FETCH_ASSOC);

        $attrStmt = $this->db->query("
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
        LEFT JOIN product_attribute_items pai ON pa.product_id = pai.product_id
        LEFT JOIN attribute_items att_items ON pai.attribute_item_id = att_items.id
    ");
        $attributeRows = $attrStmt->fetchAll(PDO::FETCH_ASSOC);

        $attributesByProduct = [];
        $existingItemIds = [];

        foreach ($attributeRows as $row) {
            $productId = $row['product_id'];
            $attrId = $row['attribute_id'];
            $itemId = $row['item_id'];

            if (!isset($attributesByProduct[$productId][$attrId])) {
                $attributesByProduct[$productId][$attrId] = [
                    'id' => $row['attribute_name'],
                    'name' => $row['attribute_name'],
                    'type' => $row['attribute_type'],
                    'items' => [],
                    '__typename' => 'AttributeSet',
                ];
                $existingItemIds[$productId][$attrId] = [];
            }

            if (!in_array($itemId, $existingItemIds[$productId][$attrId])) {
                $attributesByProduct[$productId][$attrId]['items'][] = [
                    'id' => $itemId,
                    'value' => $row['value'],
                    'displayValue' => $row['displayValue'],
                    '__typename' => 'Attribute',
                ];
                $existingItemIds[$productId][$attrId][] = $itemId;
            }
        }

        $pricesByProduct = [];
        foreach ($currencyRows as $priceRow) {
            $productId = $priceRow['product_id'];
            $pricesByProduct[$productId][] = [
                'amount' => (float)$priceRow['amount'],
                'currency' => [
                    'label' => $priceRow['currency_label'],
                    'symbol' => $priceRow['currency_symbol'],
                    '__typename' => 'Currency',
                ],
                '__typename' => 'Price',
            ];
        }

        $products = [];
        foreach ($rows as $row) {
            $productId = $row['id'];

            if (!isset($products[$productId])) {
                $products[$productId] = [
                    'id' => $productId,
                    'name' => $row['name'],
                    'inStock' => (bool)$row['inStock'],
                    'gallery' => [],
                    'description' => $row['description'],
                    'prices' => $pricesByProduct[$productId] ?? [],
                    'category' => $row['category'],
                    'brand' => $row['brand'],
                    'attributes' => array_values($attributesByProduct[$productId] ?? []),
                ];
            }

            if (!empty($row['gallery_image']) && !in_array($row['gallery_image'], $products[$productId]['gallery'])) {
                $products[$productId]['gallery'][] = $row['gallery_image'];
            }
        }

        return array_values($products);
    }


    public function show($id)
    {
        $stmt = $this->db->prepare("
        SELECT 
            p.*, 
            g.url AS gallery_image,
            c.name AS category
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN galleries g ON p.id = g.product_id
        WHERE p.id = :id
    ");
        $stmt->execute(['id' => $id]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            return null;
        }

        $currStmt = $this->db->prepare("
        SELECT 
            pr.product_id,
            pr.amount,
            c.label AS currency_label,
            c.symbol AS currency_symbol
        FROM prices pr
        LEFT JOIN currencies c ON pr.currency_label = c.label
        WHERE pr.product_id = :id
    ");
        $currStmt->execute(['id' => $id]);
        $currencyRows = $currStmt->fetchAll(PDO::FETCH_ASSOC);

        $prices = array_map(function ($row) {
            return [
                'amount' => (float)$row['amount'],
                'currency' => [
                    'label' => $row['currency_label'],
                    'symbol' => $row['currency_symbol'],
                    '__typename' => 'Currency',
                ],
                '__typename' => 'Price',
            ];
        }, $currencyRows);

        // Fetch Attributes
        $attrStmt = $this->db->prepare("
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
        WHERE pa.product_id = :id
    ");
        $attrStmt->execute(['id' => $id]);
        $attributeRows = $attrStmt->fetchAll(PDO::FETCH_ASSOC);

        $attributes = [];
        $existingItemIds = [];

        foreach ($attributeRows as $row) {
            $attrId = $row['attribute_id'];
            $itemId = $row['item_id'];

            if (!isset($attributes[$attrId])) {
                $attributes[$attrId] = [
                    'id' => $row['attribute_name'],
                    'name' => $row['attribute_name'],
                    'type' => $row['attribute_type'],
                    'items' => [],
                    '__typename' => 'AttributeSet',
                ];
                $existingItemIds[$attrId] = [];
            }

            if (!in_array($itemId, $existingItemIds[$attrId])) {
                $attributes[$attrId]['items'][] = [
                    'id' => $itemId,
                    'value' => $row['value'],
                    'displayValue' => $row['displayValue'],
                    '__typename' => 'Attribute',
                ];
                $existingItemIds[$attrId][] = $itemId;
            }
        }

        $product = [
            'id' => $rows[0]['id'],
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
}

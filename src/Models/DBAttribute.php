<?php

namespace App\Models;

use PDO;

class DBAttribute extends Attribute
{
    public function fetchProductAttributes($id = null)
    {
        $sql = "
            SELECT
                p.id AS product_id,
                a.id AS attribute_id,
                a.name AS attribute_name,
                a.type AS attribute_type,
                ai.id AS item_id,
                ai.value,
                ai.displayValue
            FROM products p
            JOIN product_attributes pa ON pa.product_id = p.id
            JOIN attributes a ON a.id = pa.attribute_id
            JOIN product_attribute_items pai ON pai.product_id = p.id AND pai.attribute_id = a.id
            JOIN attribute_items ai ON ai.id = pai.attribute_item_id
        ";

        if ($id !== null) {
            $sql .= " WHERE p.id = :id";
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
                    'id' => $attrId,
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

        if ($id !== null) {
            return array_values($attributes[$id] ?? []);
        }

        $flattened = [];
        foreach ($attributes as $productId => $attrGroup) {
            $flattened[] = [
                'product_id' => $productId,
                'attributes' => array_values($attrGroup),
            ];
        }

        return $flattened;
    }
}

<?php

namespace App\Models;

use PDO;

class DBAttribute extends Attribute
{
    public function fetchProductAttributes($id = null)
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
}

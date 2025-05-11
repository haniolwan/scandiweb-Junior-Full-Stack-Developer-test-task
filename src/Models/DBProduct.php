<?php

namespace App\Models;

use App\Models\Product;
use PDO;

class DBProduct extends Product
{
    public function all()
    {
        $stmt = $this->db->query("SELECT * FROM products");
        return ($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function show($id)
    {
        $stmt = $this->db->query("SELECT * FROM products WHERE id=:id");
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return ($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}

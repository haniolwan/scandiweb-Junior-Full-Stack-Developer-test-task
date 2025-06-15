<?php

namespace App\Models;

use PDO;

class DBCategory extends Category
{

    public function all()
    {
        $stmt = $this->db->query("SELECT * FROM categories");
        return ($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}

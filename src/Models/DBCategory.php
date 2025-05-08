<?php

namespace App\Models;

use PDO;

class DBCategory extends Category
{

    public function all()
    {
        // this should handle database requests
        $stmt = $this->db->query("SELECT * FROM categories");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

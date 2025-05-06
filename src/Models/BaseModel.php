<?php

use Config\Database;

class BaseModel extends Database
{
    protected $db;


    public function __construct()
    {
        $this->db = $this->connect();
    }
}

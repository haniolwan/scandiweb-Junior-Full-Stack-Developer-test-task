<?php

namespace Config;

use \PDO;
use \PDOException;

class Database
{
    private $host;
    private $dbname;
    private $username;
    private $password;

    public function __construct()
    {
        $this->host = 'db'; // <-- this is the Docker service name
        $this->dbname = 'scandiweb';
        $this->username = 'db_user';
        $this->password = 'password';
    }

    public function connect(): PDO
    {
        try {
            $pdo = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->dbname,
                $this->username,
                $this->password
            );
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}

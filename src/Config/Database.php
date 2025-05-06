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
        Config::load();

        $this->host = getenv('DB_HOST');
        $this->dbname = getenv('DB_NAME');
        $this->username = getenv('DB_USER');
        $this->password = getenv('DB_PASS');
    }

    protected function connect(): PDO
    {
        try {
            $pdo = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->dbname, $this->username, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}

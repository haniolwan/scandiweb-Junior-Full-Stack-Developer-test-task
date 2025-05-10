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
        $this->host = 'mysql'; // <-- this is the Docker service name
        $this->dbname = 'scandiweb';
        $this->username = 'db_user';
        $this->password = 'password';
    }

    protected function connect()
    {
        try {
            $pdo = new PDO("mysql:host=mysql;port=3306;dbname=scandiweb", "root", "password");

            //        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //        print_r($pdo);
            return $pdo;
        } catch (PDOException $e) {
            die("nnection failed: " . $e->getMessage());
        }
    }
}

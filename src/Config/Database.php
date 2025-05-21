<?php

namespace Config;

use Dotenv\Dotenv;
use \PDO;
use \PDOException;

class Database
{
    protected function connect()
    {
        try {
            // Should be hidden for testing purposes only
            $host = 'localhost';
            $dbname = 'scandiweb';
            $username = 'root';
            $password = 'StrongP@ssw0rd!';
            $port = '3306';

            $pdo = new PDO("mysql:host={$host};port={$port};dbname={$dbname}", $username, $password);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}

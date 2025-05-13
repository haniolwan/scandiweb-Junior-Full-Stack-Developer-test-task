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
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
            $dotenv->load();

            $host = $_ENV['DB_HOST'];
            $dbname = $_ENV['DB_NAME'];
            $username = $_ENV['DB_USER'];
            $password = $_ENV['DB_PASSWORD'];
            $port = $_ENV['DB_PORT'];

            $pdo = new PDO("mysql:host={$host};port={$port};dbname={$dbname}", $username, $password);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}

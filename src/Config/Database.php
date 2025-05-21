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

            // Should be hidden for testing purposes only
            $host = $_ENV['DB_HOST'] ?? 'localhost';
            $dbname = $_ENV['DB_NAME'] ?? 'scandiweb';
            $username = $_ENV['DB_USER'] ?? 'root';
            $password = $_ENV['DB_PASSWORD'] ?? 'StrongP@ssw0rd!';
            $port = $_ENV['DB_PORT'] ?? '3306';

            $pdo = new PDO("mysql:host={$host};port={$port};dbname={$dbname}", $username, $password);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}

<?php
require_once __DIR__ . '/../vendor/autoload.php';

namespace Config;

use Dotenv\Dotenv;


class Config
{
    public static function load()
    {
        // Load the .env file
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();
    }
}

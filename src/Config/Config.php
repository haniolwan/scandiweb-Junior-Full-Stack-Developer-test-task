<?php

namespace Config;

use Dotenv\Dotenv;


class Config
{
    public static function load()
    {
        // Load the .env file
        $dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
        $dotenv->load();
    }
}

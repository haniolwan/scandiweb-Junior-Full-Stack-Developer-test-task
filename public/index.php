<?php


require_once __DIR__ . '/../vendor/autoload.php';


use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');

$dotenv->load();


use Config\Config;

Config::load();



// $dbConnection = $db->connect();

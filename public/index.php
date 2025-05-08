<?php

use App\Controllers\CategoryController;
use App\Models\DBCategory;
use Config\Database;

require_once __DIR__ . '/../vendor/autoload.php';



$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/products':
        (new ProductController())->index();
        break;

    case '/':
        ((new CategoryController())->index());
        echo "fetched";
        break;
}

<?php

use App\Controllers\CategoryController;

require __DIR__ . '/vendor/autoload.php'; // or './vendor/autoload.php' if same level


$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$response = "";
switch ($uri) {
    case '/':
        $categoryController = new CategoryController();
        $response = $categoryController->index();
        break;
    case '/products':
        (new ProductController())->index();
        break;

    case '/categories':
        $response = (new CategoryController())->index();
        break;
    default:
        throw new NotFoundException();
}

echo $response;


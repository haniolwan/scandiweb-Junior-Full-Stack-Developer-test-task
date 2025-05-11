<?php

namespace App\Utils;

use Exception;

class NotFoundException extends Exception
{
    public function __construct($message = "404 Not Found")
    {
        http_response_code(404);
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type');

        parent::__construct($message);

        echo json_encode(['error' => $message]);

        exit;
    }
}

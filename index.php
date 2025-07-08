<?php


require __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {

    $r->post('/graphql', [\App\GraphQL\GraphQL::class, 'handle']);
    $r->get('/db-test', function () {
        try {

            $host = "localhost";
            $dbname = "scandiweb";
            $username = "root";
            $password = "StrongP@ssw0rd!";
            $port = "3306";

            $pdo = new PDO("mysql:host={$host};port={$port};dbname={$dbname}", $username, $password);
            $stmt = $pdo->query('SELECT 1');
            $result = $stmt->fetch();
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'result' => $result]);
        } catch (Exception $e) {
            header('Content-Type: application/json', true, 500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    });
});

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
error_reporting(E_ALL);


$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}

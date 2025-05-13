<?php

namespace App\Controllers;

use App\Factories\CategoryControllerFactory;
use App\GraphQL\Query\CategoryQuery;
use App\GraphQL\Query\ProductQuery;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ProductType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class GraphQL
{
    static public function handle()
    {
        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'products' => [
                        'type' => Type::listOf(new ProductType()),
                        'resolve' => function () {
                            return ProductQuery::get();
                        }
                    ],
                    'categories' => [
                        'type' => Type::listOf(new CategoryType()),
                        'resolve' => function () {
                            return CategoryQuery::get();
                        }
                    ]
                ]
            ]);

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            if ($input === null) {
                throw new RuntimeException('Invalid JSON input: ' . json_last_error_msg());
            }

            $query = $input['query'] ?? null;
            if ($query === null) {
                throw new RuntimeException('No query provided in the input.');
            }

            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();

            if (isset($output['errors'])) {
                error_log(print_r($output['errors'], true));
            }
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
        exit;
    }
}

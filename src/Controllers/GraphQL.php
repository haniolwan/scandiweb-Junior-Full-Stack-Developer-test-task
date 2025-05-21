<?php

namespace App\Controllers;

use App\GraphQL\Query\CategoryQuery;
use App\GraphQL\Query\ProductQuery;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\ProductType;
use App\Models\Order;
use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\InputObjectType;
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
                        'args' => [
                            'id' => Type::string(), // optional
                        ],
                        'resolve' => function ($root, $args) {
                            try {
                                if (isset($args['id'])) {
                                    $product = ProductQuery::find($args['id']);
                                    return $product ? [$product] : [];
                                } else {
                                    return ProductQuery::get();
                                }
                            } catch (Throwable $e) {
                                error_log('Error fetching products: ' . $e->getMessage());
                                return [];
                            }
                        }
                    ],
                    'categories' => [
                        'type' => Type::listOf(new CategoryType()),
                        'resolve' => function () {
                            try {
                                return CategoryQuery::get();
                            } catch (Throwable $e) {
                                return ('Error fetching categories: ' . $e->getMessage());
                                // return [];
                            }
                        }
                    ]
                ]
            ]);

            $orderProductInput = new InputObjectType([
                'name' => 'OrderProductInput',
                'fields' => [
                    'product_id' => Type::nonNull(Type::string()),
                    'currency_label' => Type::string(),
                    'price' => Type::nonNull(Type::float()),
                    'quantity' => Type::nonNull(Type::int()),
                    'attribute_item_ids' => Type::nonNull(Type::string()), // or Type::listOf(Type::string())
                ],
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'createOrder' => [
                        'type' => new OrderType(),
                        'args' => [
                            'products' => Type::nonNull(Type::listOf(Type::nonNull($orderProductInput))),
                        ],
                        'resolve' => function ($root, $args) {
                            try {
                                $order = new Order();
                                return $order->createOrderWithItems($args['products']);
                            } catch (Throwable $e) {
                                error_log('Error creating order: ' . $e->getMessage());
                            }
                        }
                    ],
                ],
            ]);


            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)

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
            $output = $result->toArray(DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE);

            if (isset($output['errors'])) {
                error_log(print_r($output['errors'], true));
            }
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');

        echo json_encode($output);
        exit;
    }
}

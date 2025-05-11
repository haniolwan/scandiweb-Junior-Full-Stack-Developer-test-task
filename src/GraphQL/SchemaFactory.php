<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;
use App\GraphQL\Mutations\ProductMutations;
use GraphQL\Type\Definition\ObjectType;
use ProductQuery;

class SchemaFactory
{
    public static function build(): Schema
    {
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => ProductQuery::get(), // Create this class
            ],
        ]);

        // $mutationType = new ObjectType([
        //     'name' => 'Mutation',
        //     'fields' => [
        //         'createProduct' => ProductMutations::create(), // Also create this
        //     ],
        // ]);

        return new Schema([
            'query' => $queryType,
            // 'mutation' => $mutationType,
        ]);
    }
}

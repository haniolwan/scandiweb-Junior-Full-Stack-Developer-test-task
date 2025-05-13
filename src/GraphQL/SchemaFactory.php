<?php

namespace App\GraphQL;

use App\GraphQL\Query\CategoryQuery;
use App\GraphQL\Query\ProductQuery;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;

class SchemaFactory
{
    public static function build(): Schema
    {
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => ProductQuery::get(),
                'categories' => CategoryQuery::get(),
            ],
        ]);

        return new Schema([
            'query' => $queryType,
        ]);
    }
}

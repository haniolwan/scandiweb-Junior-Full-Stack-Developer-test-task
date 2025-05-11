<?php

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSet extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'items' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(new AttributeType()))),
                ],
                'type' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}

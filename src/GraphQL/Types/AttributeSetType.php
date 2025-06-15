<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => (Type::string()),
                'name' => Type::nonNull(Type::string()),
                'items' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(new AttributeType()))),
                ],
                'type' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}

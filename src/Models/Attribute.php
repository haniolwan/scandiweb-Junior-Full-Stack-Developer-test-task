<?php
class Attribute
{
    private $id;
    private $name;
    private $type;

    public function __construct($id, $name, $type)
    {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
    }
}

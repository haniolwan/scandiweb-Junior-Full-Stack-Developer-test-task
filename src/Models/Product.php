<?php
abstract class Product extends BaseModel
{
    protected $id;
    protected $name;
    protected $description;
    protected $price;
    protected $category_id;

    public function __construct($id, $name, $description, $price, $category_id)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->category_id = $category_id;
    }
}

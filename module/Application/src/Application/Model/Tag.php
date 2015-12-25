<?php

namespace Application\Model;

class Tag
{
    public $id;
    public $name;
    public $created;

    public function exchangeArray($data)
    {
        $this->id = (isset($data['id'])) ? $data['id'] : null;
        $this->name = (isset($data['name'])) ? $data['name'] : null;
        $this->created = (isset($data['created'])) ? $data['created'] : null;
    }
    
}

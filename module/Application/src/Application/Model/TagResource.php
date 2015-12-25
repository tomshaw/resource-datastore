<?php

namespace Application\Model;

class TagResource
{
    public $tag_id;
    public $resource_id;

    public function exchangeArray($data)
    {
        $this->resource_id = (isset($data['resource_id'])) ? $data['id'] : null;
        $this->tag_id = (isset($data['tag_id '])) ? $data['tag_id '] : null;
    }
    
}

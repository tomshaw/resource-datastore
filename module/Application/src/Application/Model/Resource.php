<?php

namespace Application\Model;

class Resource
{
    public $id;
    public $title;
    public $description;
    public $url;
    public $node_status;
    public $node_type;
    public $views;
    public $user_id;
    public $parent_id;
    public $left_id;
    public $right_id;
    public $created_at;
    public $updated_at;
    
    const NODE_TYPE_CATEGORY            = 1;
    const NODE_TYPE_RESOURCE            = 2;
    
    const NODE_STATUS_ENABLED           = 1;
    const NODE_STATUS_DISABLED          = 2;
    
    public function exchangeArray($data)
    {
        $this->id = (isset($data['id'])) ? $data['id'] : null;
        $this->title = (isset($data['title'])) ? $data['title'] : null;
        $this->description = (isset($data['description'])) ? $data['description'] : null;
        $this->url = (isset($data['url'])) ? $data['url'] : null;
        $this->node_status = (isset($data['node_status'])) ? $data['node_status'] : null;
        $this->node_type = (isset($data['node_type'])) ? $data['node_type'] : null;
        $this->views = (isset($data['views'])) ? $data['views'] : null;
        $this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
        $this->parent_id = (isset($data['parent_id'])) ? $data['parent_id'] : null;
        $this->left_id = (isset($data['left_id'])) ? $data['left_id'] : null;
        $this->right_id = (isset($data['right_id'])) ? $data['right_id'] : null;
        $this->created_at = (isset($data['created_at'])) ? $data['created_at'] : null;
        $this->updated_at = (isset($data['updated_at'])) ? $data['updated_at'] : null;
    }
    
    public function getArrayCopy()
    {
        return get_object_vars($this);
    }
    
    public static function getTypes()
    {
        return array(
            self::NODE_TYPE_CATEGORY => 'Category',
            self::NODE_TYPE_RESOURCE => 'Resource'
        );
    }
    
    public static function getType($id)
    {
        $types = self::getTypes();
    
        if (isset($types[$id])) {
            return $types[$id];
        }
    
        return false;
    }
    
    public static function getStatuses()
    {
        return array(
            self::NODE_STATUS_ENABLED  => 'Enabled',
            self::NODE_STATUS_DISABLED => 'Disabled'
        );
    }
    
    public static function getStatus($id)
    {
        $statuses = self::getStatuses();
    
        if (isset($statuses[$id])) {
            return $statuses[$id];
        }
    
        return false;
    }
    
}

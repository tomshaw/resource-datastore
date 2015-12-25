<?php

namespace Application\Model;

class Resource
{
    public $id;
    public $title;
    public $description;
    public $url;
    public $status;
    public $views;
    public $user_id;
    public $parent_id;
    public $left_id;
    public $right_id;
    public $created_at;
    public $updated_at;
    
    const LINK_STATUS_CATEGORY            = 1;
    const LINK_STATUS_RESOURCE            = 2;
    
    public function exchangeArray($data)
    {
        $this->id = (isset($data['id'])) ? $data['id'] : null;
        $this->title = (isset($data['title'])) ? $data['title'] : null;
        $this->description = (isset($data['description'])) ? $data['description'] : null;
        $this->url = (isset($data['url'])) ? $data['url'] : null;
        $this->status = (isset($data['status'])) ? $data['status'] : null;
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
    
    public static function getStatuses()
    {
        return array(
            self::LINK_STATUS_CATEGORY => 'Category',
            self::LINK_STATUS_RESOURCE => 'Resource'
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

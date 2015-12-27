<?php

namespace Application\Model;

class Activity
{
    public $id;
    public $user_id;
    public $text;
    public $icon;
    public $ip_address;
    public $created_at;

    public function exchangeArray($data)
    {
        $this->id = (isset($data['id'])) ? $data['id'] : null;
        $this->user_id = (isset($data['user_id'])) ? $data['user_id'] : null;
        $this->text = (isset($data['text'])) ? $data['text'] : null;
        $this->icon = (isset($data['icon'])) ? $data['icon'] : null;
        $this->ip_address = (isset($data['ip_address'])) ? $data['ip_address'] : null;
        $this->created_at = (isset($data['created_at'])) ? $data['created_at'] : null;
    }
    
}

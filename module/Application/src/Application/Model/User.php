<?php

namespace Application\Model;

class User
{
    public $id;
    public $username;
    public $password;
    public $identity;
    public $email;
    public $active;
    public $created_at;
    public $updated_at;
    
    const USER_ACCOUNT_ACTIVE_YES       = 1;
    const USER_ACCOUNT_ACTIVE_NO        = 2;
    
    const USER_CACHE_KEY            = 'usercache';

    public function exchangeArray($data)
    {
        $this->id = (isset($data['id'])) ? $data['id'] : null;
        $this->username = (isset($data['username'])) ? $data['username'] : null;
        $this->password = (isset($data['password'])) ? $data['password'] : null;
        $this->identity = (isset($data['identity'])) ? $data['identity'] : null;
        $this->email = (isset($data['email'])) ? $data['email'] : null;
        $this->active = (isset($data['active'])) ? $data['active'] : null;
        $this->created_at = (isset($data['created_at'])) ? $data['created_at'] : null;
        $this->updated_at = (isset($data['updated_at'])) ? $data['updated_at'] : null;
    }
    
    public static function getActiveStatus()
    {
        return array(
            self::USER_ACCOUNT_ACTIVE_YES => 'Yes',
            self::USER_ACCOUNT_ACTIVE_NO => 'No',
        );
    }
    
    public static function getActive($id)
    {
        $active = self::getActiveStatus();
    
        if (isset($active[$id])) {
            return $active[$id];
        }
    
        return false;
    }
    
}

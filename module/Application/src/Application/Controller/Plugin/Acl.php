<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;
use Application\Controller\Plugin\AccessControl;

class Acl extends AbstractPlugin
{
    protected $roles = array();
    
    const STRING_OUT_OF_RANGE = 'na';
    
    public function getRole($id)
    {
        $roles = array_keys($this->getRoles());
        return (isset($roles[$id])) ? ucfirst($roles[$id]) : self::STRING_OUT_OF_RANGE;
    }
    
    protected function getRoles()
    {
        if (!sizeof($this->roles)) {
            $this->roles = AccessControl::getRoles();
        }
        return $this->roles;
    }
}

<?php

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;
use Application\Controller\Plugin\AccessControl;

class Acl extends AbstractHelper
{    
    
    public function getRoles()
    {
        $data = array();
        foreach(AccessControl::getRoles() as $key => $value) {
            $data[] = $value;
        }
        return $data;
    }
    
    protected function getRole($id)
    {
        $roles = array_keys($this->getRoles());
        if (isset($roles[$id])) {
            return ucfirst($roles[$id]);
        }
    
        return self::DEFAULT_IDENTITY_STR;
    }
    
}

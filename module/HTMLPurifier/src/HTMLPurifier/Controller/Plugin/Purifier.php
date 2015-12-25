<?php

namespace HTMLPurifier\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class Purifier extends AbstractPlugin
{
    public function __invoke($data)
    {
        $purifier = $this->getController()->getServiceLocator()->get('HTMLPurifier');
        
        if (is_string($data)) {
            
            $data = $purifier->purify($data);
            
        } else if (is_array($data) || is_object($data)) {

            array_walk_recursive($data, function(&$value, $key) use ($purifier) {
                $value = $purifier->purify($value);
            });
            
        }
        
        return $data;
    }
}
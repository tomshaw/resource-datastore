<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class Authorize extends AbstractPlugin
{
    protected $serviceLocator;
    
    public function setServiceLocator($serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
    }
    
    protected function getServiceLocator()
    {
        return $this->serviceLocator;
    }
    
    protected function getAuthService()
    {
        return $this->getServiceLocator()->get('AuthService');
    }
    
    public function __invoke($message = '', $routeName = 'home')
    {
        if (false === ($this->getAuthService()->hasIdentity())) {
            if (!empty($message)) {
                $this->getController()->flashmessenger()->addMessage($message);
            }
            $this->getController()->redirect()->toRoute($routeName);
            return $this->getController()->getAction(); // luck :)
        }   
    }

}

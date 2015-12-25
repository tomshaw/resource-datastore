<?php

namespace Admin\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class Navbar extends AbstractPlugin
{
    protected $serviceLocator;

    public function setServiceLocator($serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
        return $this;
    }

    protected function getServiceLocator()
    {
        return $this->serviceLocator;
    }

    public function init()
    {
        $storage = $this->getServiceLocator()->get('AuthStorage');
        
        if ($storage) {
            $user = $this->getServiceLocator()->get('Application\Model\UserTable');
            $view = $this->getServiceLocator()->get('ViewRenderer');
            $view->placeholder('navbar')->append($view->partial('admin/navbar', array(
                'data' => $storage->read(),
                'user' => $user
            )));
        }
    }
}

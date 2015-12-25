<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class Header extends AbstractPlugin
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
        $authService = $this->getServiceLocator()->get('AuthService');
        $view = $this->getServiceLocator()->get('ViewRenderer');
        $view->placeholder('header')->append($view->partial('application/header', array(
            'service' => $authService
        )));
    }

}

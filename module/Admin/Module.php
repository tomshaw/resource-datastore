<?php

namespace Admin;

use Zend\Mvc\MvcEvent;

class Module
{

    public function onBootstrap(MvcEvent $e)
    {
        $eventManager = $e->getApplication()->getEventManager();
        
        $eventManager->attach(\Zend\Mvc\MvcEvent::EVENT_ROUTE, array($this, 'handleLayout'), 2);
        $eventManager->attach(\Zend\Mvc\MvcEvent::EVENT_ROUTE, array($this, 'handlePartials'), 2);
    }

    public function handleLayout(MvcEvent $e)
    {
        $sharedManager = $e->getApplication()->getEventManager()->getSharedManager();
        $sharedManager->attach('Zend\Mvc\Controller\AbstractActionController', 'dispatch', function ($e) {
            $controller = $e->getTarget();
            $controllerClass = get_class($controller);
            $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
            if ($moduleNamespace == __NAMESPACE__) {
                $controller->layout('layout/admin');
            }
        }, 100);
    }

    public function handlePartials(MvcEvent $e)
    {
        $sharedManager = $e->getApplication()->getEventManager()->getSharedManager();
        $sharedManager->attach('Zend\Mvc\Controller\AbstractActionController', 'dispatch', function ($e) {
            $controller = $e->getTarget();
            $controllerClass = get_class($controller);
            $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
            if ($moduleNamespace == __NAMESPACE__) {
                $serviceManager = $e->getApplication()->getServiceManager();
                $serviceManager->get('ControllerPluginManager')->get('AdminNavbar')->setServiceLocator($serviceManager)->init();
            }
        }, 100);
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__
                )
            )
        );
    }

    public function getServiceConfig()
    {
        return array();
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getControllerPluginConfig()
    {
        return array(
            'factories' => array(
                'AdminNavbar' => function ($sm) {
                    $helper = new \Admin\Controller\Plugin\Navbar();
                    $helper->setServiceLocator($sm->getServiceLocator());
                    return $helper;
                },
                'Dashboard' => function ($sm) {
                    $helper = new \Admin\Controller\Plugin\Dashboard();
                    $helper->setServiceLocator($sm->getServiceLocator());
                    return $helper;
                }
            )
        );
    }
}

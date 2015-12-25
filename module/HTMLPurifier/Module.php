<?php

namespace HTMLPurifier;

use Zend\Mvc\MvcEvent;

use HTMLPurifier\View\Helper\Purify;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        defined('HTMLPURIFIER_PREFIX') || define('HTMLPURIFIER_PREFIX', APPLICATION_PATH . DS . 'vendor' . DS . 'ezyang' . DS . 'htmlpurifier' . DS . 'library');
        $e->getApplication()->getEventManager()->attach('route', array($this, 'initHTMLPurifier'), 2);
    }
    
    public function initHTMLPurifier(MvcEvent $e)
    {
        $app    = $e->getApplication();
    
        $config = $app->getServiceManager()->get('Config');
    
        $purifierConfig = \HTMLPurifier_Config::createDefault();
    
        if (!empty($config['HTMLPurifier']['config'])) {
            foreach ($config['HTMLPurifier']['config'] as $key => $val) {
                $purifierConfig->set($key, $val);
            }
        }
    
        $app->getServiceManager()->setService('HTMLPurifier', new \HTMLPurifier($purifierConfig));
    }
    
    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                    'HTMLPurifier' => HTMLPURIFIER_PREFIX . DS . 'HTMLPurifier'
                )
            )
        );
    }
    
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
    
    public function getViewHelperConfig()
    {
        return array(
            'factories' => array(
                'purify' => function($sm) {
                    return new Purify($sm->getServiceLocator()->get('HTMLPurifier'));
                 }
            )
        );
    }
    
    public function getControllerPluginConfig()
    {
        return array(
            'invokables' => array(
                'purify' => 'HTMLPurifier\Controller\Plugin\Purifier'
            )
        );
    }

}

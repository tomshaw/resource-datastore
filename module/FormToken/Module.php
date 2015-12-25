<?php

namespace FormToken;

class Module
{
	
	public function getConfig()
	{
	    return array();
	}

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                )
            )
        );
    }
    
    public function getControllerPluginConfig()
    {
        return array(
            'invokables' => array(
                'token' => 'FormToken\Controller\Plugin\FormToken'
            )
        );
    }
    
}

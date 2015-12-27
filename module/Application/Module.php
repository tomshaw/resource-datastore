<?php
namespace Application;

namespace Application;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable as DbTableAuthAdapter;
use Zend\Cache\StorageFactory;

// use Zend\Session\Container;
use Application\Model\AuthStorage;
use Application\Model\Activity;
use Application\Model\ActivityTable;
use Application\Model\User;
use Application\Model\UserTable;
use Application\Model\Resource;
use Application\Model\ResourceTable;
use Application\Model\Tag;
use Application\Model\TagTable;
use Application\Model\TagResource;
use Application\Model\TagResourceTable;
use Application\Model\DashboardTable;

class Module
{

    public function onBootstrap(MvcEvent $e)
    {
        $eventManager = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
        
        $eventManager->attach(\Zend\Mvc\MvcEvent::EVENT_ROUTE, array(
            $this,
            'handleAccessControl'
        ), 2);
        $eventManager->attach(\Zend\Mvc\MvcEvent::EVENT_ROUTE, array(
            $this,
            'handlePartials'
        ), 2);
    }

    public function handleAccessControl(MvcEvent $e)
    {
        $application = $e->getApplication();
        $serviceManager = $application->getServiceManager();
        $sharedManager = $application->getEventManager()->getSharedManager();
        
        $router = $serviceManager->get('router');
        $request = $serviceManager->get('request');
        
        $match = $router->match($request);
        
        if ($match) {
            $sharedManager->attach('Zend\Mvc\Controller\AbstractActionController', 'dispatch', function ($e) use($serviceManager) {
                $serviceManager->get('ControllerPluginManager')
                    ->get('AccessControl')
                    ->initialize($e);
            }, 2);
        }
    }

    public function handlePartials(MvcEvent $e)
    {
        $sharedManager = $e->getApplication()
            ->getEventManager()
            ->getSharedManager();
        $sharedManager->attach('Zend\Mvc\Controller\AbstractActionController', 'dispatch', function ($e) {
            $controller = $e->getTarget();
            $controllerClass = get_class($controller);
            $moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
            if ($moduleNamespace == __NAMESPACE__) {
                $serviceManager = $e->getApplication()
                    ->getServiceManager();
                $serviceManager->get('ControllerPluginManager')
                    ->get('app-header')
                    ->setServiceLocator($serviceManager)
                    ->init();
            }
        }, 100);
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
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
        return array(
            'factories' => array(
                'ZendCacheStorageFactory' => function () {
                    return StorageFactory::factory(array(
                        'adapter' => array(
                            'name' => 'filesystem',
                            'options' => array(
                                'dirLevel' => 2,
                                'cacheDir' => 'data/cache',
                                'dirPermission' => 0755,
                                'filePermission' => 0666,
                                'namespaceSeparator' => '-db-'
                            )
                        ),
                        'plugins' => array(
                            'serializer'
                        )
                    ));
                },
                'AuthStorage' => function ($sm) {
                    return new AuthStorage('AuthStorage');
                },
                'AuthService' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $dbTableAuthAdapter = new DbTableAuthAdapter($dbAdapter, 'user', 'email', 'password', 'MD5(?)');
                    $authService = new AuthenticationService();
                    $authService->setAdapter($dbTableAuthAdapter);
                    $authService->setStorage($sm->get('AuthStorage'));
                    return $authService;
                },
                'Application\Model\Activity' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Activity());
                    return new TableGateway('activity', $dbAdapter, null, $resultSetPrototype);
                },
                'Application\Model\ActivityTable' => function ($sm) {
                    $tableGateway = $sm->get('Application\Model\Activity');
                    $table = new ActivityTable($tableGateway);
                    return $table;
                },
                'Application\Model\User' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new User());
                    return new TableGateway('user', $dbAdapter, null, $resultSetPrototype);
                },
                'Application\Model\UserTable' => function ($sm) {
                    $tableGateway = $sm->get('Application\Model\User');
                    $table = new UserTable($tableGateway);
                    return $table;
                },
                'Application\Model\Resource' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Resource());
                    return new TableGateway('resource', $dbAdapter, null, $resultSetPrototype);
                },
                'Application\Model\ResourceTable' => function ($sm) {
                    $tableGateway = $sm->get('Application\Model\Resource');
                    $table = new ResourceTable($tableGateway);
                    return $table;
                },
                'Application\Model\Tag' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Tag());
                    return new TableGateway('tag', $dbAdapter, null, $resultSetPrototype);
                },
                'Application\Model\TagTable' => function ($sm) {
                    $tableGateway = $sm->get('Application\Model\Tag');
                    $table = new TagTable($tableGateway);
                    return $table;
                },
                'Application\Model\TagResource' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new TagResource());
                    return new TableGateway('tag_resource', $dbAdapter, null, $resultSetPrototype);
                },
                'Application\Model\TagResourceTable' => function ($sm) {
                    $tableGateway = $sm->get('Application\Model\TagResource');
                    $table = new TagResourceTable($tableGateway);
                    return $table;
                },
                'Application\Model\ResourceFactory' => 'Application\Model\ResourceFactory',
                'Application\Model\DashboardTable' => function ($sm) {
                    $tableGateway = $sm->get('Application\Model\Resource');
                    $table = new DashboardTable($tableGateway);
                    return $table;
                },
                /*'aliases' => array(
                    'cache' => 'ZendCacheStorageFactory'
                )*/
            )
        );
    }

    public function getViewHelperConfig()
    {
        return array(
            'factories' => array(
                'TimeFormat' => function ($sm) {
                    $helper = new \Application\View\Helper\TimeFormat();
                    return $helper;
                }
            )
        );
    }

    public function getControllerPluginConfig()
    {
        return array(
            'invokables' => array(
                'AccessControl' => 'Application\Controller\Plugin\AccessControl',
                'Roles' => 'Application\Controller\Plugin\Roles',
                'Dump' => 'Application\Controller\Plugin\Dump'
            ),
            'factories' => array(
                'app-header' => function ($sm) {
                    $helper = new Controller\Plugin\Header();
                    $helper->setServiceLocator($sm->getServiceLocator());
                    return $helper;
                },
                'activity' => function ($sm) {
                    $helper = new Controller\Plugin\Activity();
                    $helper->setServiceLocator($sm->getServiceLocator());
                    return $helper;
                },
                'tags' => function ($sm) {
                    $helper = new Controller\Plugin\Tags();
                    $helper->setServiceLocator($sm->getServiceLocator());
                    return $helper;
                }
            )
        );
    }
}

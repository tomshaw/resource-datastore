<?php
/**
 * @todo Add security token to form.
 * @see https://github.com/zendframework/zf2/issues/2887
 */
namespace SimpleGrid\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;
use Zend\Session\Container;
use Zend\Session\ManagerInterface as Manager;

class Grid extends AbstractPlugin
{
    protected $namespace;

    protected $container;

    protected $session;
    
    protected $columns;

    public function __invoke($namespace, $columns = array())
    {
        $this->setNamespace($namespace);
        
        if (sizeof($columns)) {
        	$this->columns = $columns;
        }

        return $this->init();
    }
    
    public function init()
    {    
        $post = $this->getController()->params()->fromPost();
        
        $columns = $this->getColumns();
        
        $params = $post;

        if (array_key_exists('order', $post) && isset($columns[$post['order'][0]['column']])) {
        	$params['order'] = $columns[$post['order'][0]['column']];
        } else {
        	$params['order'] = 'id';
        }
        
        if (array_key_exists('order', $post) && isset($post['order'])) {
        	$params['sort'] = $post['order'][0]['dir'];
        } else {
        	$params['sort'] = 'desc';
        }
        
        $container = $this->getContainer();
        if (isset($post['action'])) {
            if ($post['action'] == 'filter') {
                if ($container->offsetGet('data')) {
                    $container->offsetSet('data', array_merge($container->offsetGet('data'), $params));
                } else {
                    $container->offsetSet('data', $params);
                }
            } else {
                $container->offsetSet('data', $params);
            }
        } else {
            if ($container->offsetGet('data')) {
                $container->offsetSet('data', array_merge($container->offsetGet('data'), $params));
            } else {
                $container->offsetSet('data', $params);
            }
        }
        
        return $container->offsetGet('data');
    }
    
    public function setColumns($columns = array())
    {
    	$this->columns = $columns;
    }
    
    public function getColumns()
    {
    	return $this->columns;
    }

    public function setNamespace($namespace)
    {
        $this->namespace = $namespace;
        return $this;
    }

    public function getNamespace()
    {
        return $this->namespace;
    }

    public function setSessionManager(Manager $manager)
    {
        $this->session = $manager;
        return $this;
    }

    public function getSessionManager()
    {
        if (!$this->session instanceof Manager) {
            $this->setSessionManager(Container::getDefaultManager());
        }

        return $this->session;
    }

    public function getContainer()
    {
        if ($this->container instanceof Container) {
            return $this->container;
        }

        $manager = $this->getSessionManager();
        $this->container = new Container($this->getNamespace(), $manager);

        return $this->container;
    }
    
    protected function dump($var, $message = '')
    {
        return \Zend\Debug\Debug::dump($var, $message);
    }

}
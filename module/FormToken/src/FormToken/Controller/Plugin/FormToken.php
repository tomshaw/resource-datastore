<?php
/**
 * Form Token Controller Plugin
 * 
 */
namespace FormToken\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;
use Zend\Session\Container;

class FormToken extends AbstractPlugin
{
    protected $request;
    
    protected $name = 'token';
    
    protected $hash;
    
    protected $salt = 'SLY`Kdd8PP89#?|[re]%|fOep_yI(CdoDZvR==W};X+}3<=iRm]5c,jjrJ3%7N|?';
    
    protected $session;
    
    protected $expirationHops = 1;
    
    protected $timeout = 360;
    
    protected $token;
    
    protected $saved = array();
    
    const INPUT_TYPE = 'hidden';
    
    public function __invoke()
    {
        $this->setName(get_class($this));
        if (isset($this->getSession()->hash)) {
            $this->setSaved($this->getSession()->hash);
        }
        if ($this->getRequest()->isPost()) {
            if ($this->getRequest()->getPost()->offsetExists('token')) {
                $this->setToken($this->getRequest()->getPost()->get('token'));
            }   
        } 
        return $this;
    }
    
    public function getRequest()
    {
        if (is_null($this->request)) {
            $this->request = $this->getController()->getRequest();
        }
        return $this->request;
    }
    
    public function setToken($token)
    {
        $this->token = $token;
    }
    
    public function getToken()
    {
        return $this->token;
    }
    
    public function getSession()
    {
        if (is_null($this->session)) {
            $this->session = new Container($this->getSessionName());
        }
        return $this->session;
    }
    
    public function validate()
    {
        if (sizeof($this->getSaved())) {
            if (in_array($this->getToken(), $this->getSaved())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    public function getSalt()
    {
        return $this->salt;
    }
    
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
    
    public function getName()
    {
        return $this->name;
    }
    
    public function getSessionName()
    {
        return $this->getName();
    }
    
    public function setTimeout($ttl)
    {
        $this->timeout = (int) $ttl;
        return $this;
    }
    
    public function getTimeout()
    {
        return $this->timeout;
    }
    
    public function setExpirationHops($expirationHops)
    {
        $this->expirationHops = (int) $expirationHops;
        return $this;
    }
    
    public function getExpirationHops()
    {
        return $this->expirationHops;
    }
    
    public function getHash()
    {
        if (is_null($this->hash)) {
            $this->hash = md5(mt_rand(1, 1000000) . $this->getSalt() . $this->getName() . mt_rand(1, 1000000));
        }
        return $this->hash;
    }
    
    public function setSaved($saved)
    {
        $this->saved[] = $saved;
    }
    
    public function getSaved()
    {
        return $this->saved;
    }
    
    public function save()
    {
        $session = $this->getSession();
        $session->setExpirationHops($this->getExpirationHops());
        $session->setExpirationSeconds($this->getTimeout());
        $session->hash = $this->getHash();
        return $this;
    }
    
    public function create()
    {
        return '<input type="' . self::INPUT_TYPE . '" name="token" value="' . $this->save()->getHash() . '">';
    }
    
    protected function dump($var, $message = '')
    {
        return \Zend\Debug\Debug::dump($var, $message);
    }
    
}
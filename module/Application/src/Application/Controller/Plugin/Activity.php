<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;
use Zend\Db\Sql\Expression;

/**
 * icons
 * fa fa-calendar
 * fa fa-comment
 * fa fa-truck
 * fa fa-money
 * fa fa-user
 * fa fa-check
 * fa fa-globe
 * fa fa-check
 */

class Activity extends AbstractPlugin
{
    protected $serviceLocator;

    protected $activityTable;

    protected $authservice;

    public function setServiceLocator($serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
    }

    protected function getServiceLocator()
    {
        return $this->serviceLocator;
    }

    public function getActivityTable()
    {
        if (!$this->activityTable) {
            $sm = $this->getServiceLocator();
            $this->activityTable = $sm->get('Application\Model\ActivityTable');
        }
        return $this->activityTable;
    }

    public function getAuthService()
    {
        if (!$this->authservice) {
            $this->authservice = $this->getServiceLocator()->get('AuthService');
        }
        return $this->authservice;
    }

    /**
     * @todo sprintf('%s has just logged out.', 'Tom');
     * 
     */
    public function __invoke($label, $icon)
    {
        $ip = $this->getController()->getRequest()->getServer('REMOTE_ADDR');
        
        $userId = ($this->getAuthService()->hasIdentity()) ? $this->getAuthService()->getIdentity()->id : 0;
        
        $data = array(
            'text' => $label,
            'icon' => $icon,
            'user_id' => $userId,
            'ip_address' => ip2long($ip),
            'created_at' => new Expression('NOW()')
        );
        
        return $this->getActivityTable()->add($data);
    }
}

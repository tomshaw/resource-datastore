<?php

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
//use Zend\Json\Json;

class AdminController extends AbstractActionController
{
    protected $authservice;
    
    protected $dashboardTable;
    
    public function getAuthService()
    {
        if (!$this->authservice) {
            $this->authservice = $this->getServiceLocator()->get('AuthService');
        }
        return $this->authservice;
    }
    
    public function getDashboardTable()
    {
        if (!$this->dashboardTable) {
            $sm = $this->getServiceLocator();
            $this->dashboardTable = $sm->get('Application\Model\DashboardTable');
        }
        return $this->dashboardTable;
    }
    
	public function indexAction()
	{
	    $vm = new ViewModel();
	    return $vm;
	}
	
}

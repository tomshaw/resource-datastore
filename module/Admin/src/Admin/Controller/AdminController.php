<?php

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Json\Json;

use Application\Model\Resource as ResourceModel;

class AdminController extends AbstractActionController
{
    protected $authservice;
    
    protected $dashboardTable;
    
    protected $activityTable;
    
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
    
    public function getActivityTable()
    {
        if (!$this->activityTable) {
            $sm = $this->getServiceLocator();
            $this->activityTable = $sm->get('Application\Model\ActivityTable');
        }
        return $this->activityTable;
    }
    
	public function indexAction()
	{
	    $this->append();

	    $vm = new ViewModel();
	    
	    $vm->setVariable('activity', $this->getActivityTable()->fetchLatest());

	    $vm->setVariable('total_categories', $this->getDashboardTable()->fetchCountResources(ResourceModel::NODE_TYPE_CATEGORY));
	    $vm->setVariable('total_resources', $this->getDashboardTable()->fetchCountResources(ResourceModel::NODE_TYPE_RESOURCE));
	    $vm->setVariable('total_views', $this->getDashboardTable()->fetchTotalViews());
	    $vm->setVariable('total_tags', $this->getDashboardTable()->fetchTotalTags());
	    
	    return $vm;
	}
	
	public function dataAction()
	{
	    $request = $this->getRequest();
	
	    $response = $this->getResponse();
	
	    $errors = array();
	
	    if (!$request->isXmlHttpRequest()) {
	        //$errors[] = 'Invalid access method.';
	    }
	
	    if (sizeof($errors)) {
	        $response->setStatusCode(200)->setContent(Json::encode(array('errors'=>$errors)));
	        return $response;
	    }
	
	    $results = $this->getDashboardTable()->fetchTopTags();
	
	    $response->setStatusCode(200);
	
	    $response->setContent(Json::encode($results));
	
	    return $response;
	}
	
	public function append()
	{
        //$this->getServiceLocator()->get('viewhelpermanager')->get('HeadLink')->appendStylesheet('/assets/plugins/autocomplete/css/autocomplete.css');
	
        $this->getServiceLocator()->get('viewhelpermanager')->get('InlineScript')
            ->appendFile('/vendor/Flot/jquery.flot.js')
            ->appendFile('/vendor/Flot/jquery.flot.resize.js')
            ->appendFile('/vendor/Flot/jquery.flot.categories.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/amcharts.js')
            //->appendFile('/vendor/amcharts/dist/amcharts/plugins/dataloader/dataloader.min.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/themes/light.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/serial.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/pie.js')
            ->appendFile('/acp/js/dashboard.js');
        
	}
	
}

<?php

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Json\Json;

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
	    
	    return $vm;
	}
	
	public function dataAction()
	{
	    $request = $this->getRequest();
	
	    $response = $this->getResponse();
	
	    $errors = array();
	
	    if (!$request->isXmlHttpRequest()) {
	        $errors[] = 'Invalid access XmlHttpRequest method.';
	    }
	
	    if (sizeof($errors)) {
	        $response->setStatusCode(200)->setContent(Json::encode(array('errors'=>$errors)));
	        return $response;
	    }
	    
	    $data = array();
	    $data['top_tags'] = $this->dashboard()->fetchTopTags();
	    $data['top_days'] = $this->dashboard()->fetchTopDays();
	    $data['widget_totals'] = $this->dashboard()->fetchWidgetTotals();
	    
	    $data['daily_growth'] = $this->dashboard()->dailyGrowth();
	    $data['yearly_activity'] = $this->dashboard()->yearlyGrowth();
	    $data['weekly_activity'] = $this->dashboard()->weeklyActivity();
	
	    $response->setStatusCode(200);
	
	    $response->setContent(Json::encode($data));
	
	    return $response;
	}
	
	public function append()
	{	
        $this->getServiceLocator()->get('viewhelpermanager')->get('InlineScript')
            
            ->appendFile('/vendor/Flot/jquery.flot.js')
            ->appendFile('/vendor/Flot/jquery.flot.resize.js')
            ->appendFile('/vendor/Flot/jquery.flot.categories.js')
            
            ->appendFile('/vendor/highcharts/highcharts.js')
            ->appendFile('/vendor/highcharts/highcharts-3d.js')
            ->appendFile('/vendor/highcharts/highcharts-more.js')
            
            ->appendFile('/vendor/amcharts/dist/amcharts/amcharts.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/themes/light.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/serial.js')
            ->appendFile('/vendor/amcharts/dist/amcharts/pie.js')
            
            ->appendFile('/acp/js/dashboard.js');
        
	}
	
}

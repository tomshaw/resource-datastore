<?php

namespace Admin\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

use Application\Model\Resource as ResourceModel;

class Dashboard extends AbstractPlugin
{
    protected $serviceLocator;
    
    protected $dashboardTable;
    
    public function setServiceLocator($serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
    }
    
    protected function getServiceLocator()
    {
        return $this->serviceLocator;
    }
    
    public function getDashboardTable()
    {
        if (!$this->dashboardTable) {
            $sm = $this->getServiceLocator();
            $this->dashboardTable = $sm->get('Application\Model\DashboardTable');
        }
        return $this->dashboardTable;
    }
    
    public function fetchWidgetTotals()
    {
        $data = array();
        $data['total_categories'] = $this->getDashboardTable()->fetchCountResources(ResourceModel::NODE_TYPE_CATEGORY);
        $data['total_resources'] =  $this->getDashboardTable()->fetchCountResources(ResourceModel::NODE_TYPE_RESOURCE);
        $data['total_views'] =  $this->getDashboardTable()->fetchTotalViews();
        $data['total_tags'] =  $this->getDashboardTable()->fetchTotalTags();
        return $data;
    }
    
    public function fetchTopTags()
    {
        return $this->getDashboardTable()->fetchTopTags();
    }
    
}

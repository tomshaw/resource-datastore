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
    
    public function quarterlyGrowth()
    {
        $rows = $this->getDashboardTable()->quarterlyGrowth();
    
        $quarters = array('1','2','3','4');
    
        $data = array();
        foreach ($rows as $row) {
            $data[$row['year']][$row['quarter']] = $row;
        }
    
        for ($i = 0; $i < count($quarters); $i ++) {
            $quarter = $quarters[$i];
            foreach ($data as $index => $value) {
                if (isset($data[$index][$quarter])) {
                    continue;
                }
                $data[$index][$quarter] = array(
                    "year" => $index,
                    "quarter" => $quarter,
                    "sales" => 0,
                    "profits" => 0
                );
                ksort($data[$index]);
            }
        }
    
        return $data;
    }
    
    public function weeklyActivity()
    {
        $rows = $this->getDashboardTable()->fetchAggregate('week');
        
        $weeks = array();
        for ($i = 0; $i <= 52; $i++) {
            $weeks[$i] = $i;
        }
    
        $data = array();
        foreach ($rows as $row) {
            $data[$row['year']][$row['week']] = $row;
        }
    
        for ($i = 0; $i < count($weeks); $i++) {
            $week = $weeks[$i];
            foreach ($data as $index => $value) {
                if (isset($data[$index][$week])) {
                    continue;
                }
                $data[$index][$week] = array(
                    "year" => $index,
                    "week" => $week,
                    "views" => 0,
                    "total" => 0
                );
                ksort($data[$index]);
            }
        }
    
        $out = array();
        foreach ($data as $index => $value) {
            foreach ($value as $key => $val) {
                $out[$index][] = $val;
            }
        }
    
        return $out;
    }
    
    public function yearlyGrowth()
    {
        $rows = $this->getDashboardTable()->fetchAggregate('year');
    
        $months = array('1','2','3','4','5','6','7','8','9','10','11','12');
        
        $monthNames = array('1'=>'January','2'=>'February','3'=>'March','4'=>'April','5'=>'May','6'=>'June','7'=>'July','8'=>'August','9'=>'September','10'=>'October','11'=>'November','12'=>'December');
    
        $data = array();
        foreach ($rows as $row) {
            $data[$row['year']][$row['month']] = $row;
        }
    
        for ($i = 0; $i < count($months); $i++) {
            $month = $months[$i];
            $monthName = $monthNames[$month];
            foreach ($data as $index => $value) {
                if (isset($data[$index][$month])) {
                    continue;
                }
                $data[$index][$month] = array(
                    "year" => $index,
                    "month" => $month,
                    "monthname" => $monthName,
                    "views" => 0,
                    "total" => 0
                );
                ksort($data[$index]);
            }
        }
    
        $out = array();
        foreach ($data as $index => $value) {
            foreach ($value as $key => $val) {
                $out[$index][] = $val;
            }
        }
    
        return $out;
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

<?php

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Paginator\Adapter\ArrayAdapter;
use Zend\Paginator\Paginator;
use Zend\View\Model\ViewModel;
use Zend\Json\Json;

class ActivityController extends AbstractActionController
{  
    protected $activityTable;
    
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
    
        return $vm;
    }
    
    public function dataAction()
    {
        $request = $this->getRequest();
        
        $response = $this->getResponse();
        
        $post = $this->purify($request->getPost());
        
        $actionMessage = array();
        if (isset($post->action)) {
        
            if (sizeof($post->id)) {
        
                if ($post->action == 'mark-delete') {
                    
                    foreach($post->id as $id) {
                        $this->getActivityTable()->delete(array('id'=>$id));
                    }
                    
                    $actionMessage = array('message'=> 'A total of '.count($post->id).' records have been deleted successfully.', 'status'=>'OK');
                    
                }
            }

        }
    
        $grid = $this->grid('Admin\Activity\Index', array('-','id','text','username','created_at','-'));
    
        $result = $this->getActivityTable()->fetchDataGrid($grid);
    
        $adapter = new ArrayAdapter($result);
    
        $paginator = new Paginator($adapter);
    
        $page = ceil(intval($grid['start']) / intval($grid['length'])) + 1;
    
        $paginator->setCurrentPageNumber($page);
    
        $paginator->setItemCountPerPage(intval($grid['length']));
    
        $data = array();
        $data['data'] = array();
    
        foreach ($paginator as $row) {
            $data['data'][] = array(
                '<input type="checkbox" name="id['.$row['id'].']" value="'.$row['id'].'" />',
                $row['id'],
                $row['text'],
                $row['username'],
                $row['created_at'],
                '<a href="/admin/activity/view/id/' . $row['id'] . '" class="btn btn-xs btn-outline blue-steel" data-id="' . $row['id'] . '" title="View Activity"><i class="fa fa-search"></i> View</a>'
            );
        }
    
        $data['page'] = $page;
        $data['grid'] = $grid;
        $data['draw'] = intval($grid['draw']);
        $data['recordsTotal'] = $paginator->getTotalItemCount();
        $data['recordsFiltered'] = $paginator->getTotalItemCount();
        
        if (sizeof($actionMessage)) {
            $data['actionMessage'] = $actionMessage;
        }
    
        $response->setStatusCode(200);
    
        $response->setContent(Json::encode($data));
    
        return $response;
    }
    
    public function viewAction()
    {
        $id = (int) $this->params()->fromRoute('id', false);
         
        if (!($row = $this->getActivityTable()->fetchRow(array('id'=>$id)))) {
            $this->flashmessenger()->addMessage('Activity row could not be found.');
            return $this->redirect()->toRoute('admin-activity');
        }
    
        $vm = new ViewModel();
         
        $vm->setVariable('token', $this->token()->create());
    
        $vm->setVariable('row', $row);
    
        return $vm;
    }
    
    public function append()
    {
        /*$this->getServiceLocator()->get('viewhelpermanager')->get('HeadLink')
            ->appendStylesheet('/vendor/datatables/media/css/jquery.dataTables.css')
            ->appendStylesheet('/vendor/datatables/media/css/dataTables.bootstrap.css')
            ->appendStylesheet('/vendor/bootstrap-datepicker/dist/css/bootstrap-datepicker.css');*/
    
        $this->getServiceLocator()->get('viewhelpermanager')->get('InlineScript')
            //->appendFile('/vendor/datatables/media/js/jquery.dataTables.js')
            //->appendFile('/vendor/datatables/media/js/dataTables.bootstrap.js')
            //->appendFile('/vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.js')
            ->appendFile('/acp/js/grids/datagrid.js')
            ->appendFile('/acp/js/grids/activity.js');
    
    }
    
}

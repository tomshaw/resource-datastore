<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Paginator\Adapter\ArrayAdapter;
use Zend\Paginator\Paginator;
use Zend\View\Model\ViewModel;
use Zend\Json\Json;

class IndexController extends AbstractActionController
{
    protected $authservice;
    
    protected $resourceTable;
    
    protected $userTable;
    
    public function getAuthService()
    {
        if (!$this->authservice) {
            $this->authservice = $this->getServiceLocator()->get('AuthService');
        }
        return $this->authservice;
    }
    
    public function getResourceTable()
    {
        if (!$this->resourceTable) {
            $sm = $this->getServiceLocator();
            $this->resourceTable = $sm->get('Application\Model\ResourceTable');
        }
        return $this->resourceTable;
    }
    
    public function getUserTable()
    {
        if (!$this->userTable) {
            $sm = $this->getServiceLocator();
            $this->userTable = $sm->get('Application\Model\UserTable');
        }
        return $this->userTable;
    }
    
    public function indexAction()
    {
        $categories = $this->getResourceTable()->fetchCategories([]);
        
        $vm = new ViewModel();
        
        $vm->setVariable('categories', $categories);
        
        return $vm;
    }

    public function dataAction()
    {
        $response = $this->getResponse();
    
        $grid = $this->grid('Application\Index\Index', array('id','title','category','created_at','-'));
    
        $result = $this->getResourceTable()->fetchResources($grid);
    
        $adapter = new ArrayAdapter($result);
    
        $paginator = new Paginator($adapter);
        
        $page = ceil(intval($grid['start']) / intval($grid['length'])) + 1;
    
        $paginator->setCurrentPageNumber($page);
    
        $paginator->setItemCountPerPage(intval($grid['length'])); 
    
        $data = array();
        $data['data'] = array();
    
        foreach ($paginator as $row) {
            $data['data'][] = array(
                $row['id'],
                '<strong>' . $row['title'] . '</strong><br/>' . $row['description'],
                $row['category'],
                $row['created_at'],
                '<a href="' . $row['url'] . '" class="btn btn-xs default btn-editable btn-view" data-id="' . $row['id'] . '" title="View Resource" target="_blank"><i class="fa fa-search"></i> View</a>'
            );
        }
    
        $data['page'] = $page;
        $data['grid'] = $grid;
        $data['draw'] = intval($grid['draw']);
        $data['recordsTotal'] = $paginator->getTotalItemCount();
        $data['recordsFiltered'] = $paginator->getTotalItemCount();
    
        $response->setStatusCode(200);
    
        $response->setContent(Json::encode($data));
    
        return $response;
    }
    
    public function viewsAction()
    {
        $request = $this->getRequest();
    
        $response = $this->getResponse();
    
        $post = $this->purify($request->getPost());
    
        $errors = array();
    
        if (!$request->isXmlHttpRequest()) {
            $errors[] = 'Invalid access method.';
        }
    
        if (!$request->isPost()) {
            $errors[] = 'Invalid access method.';
        }
    
        if (sizeof($errors)) {
            $response->setStatusCode(200)->setContent(Json::encode(array('errors'=>$errors)));
            return $response;
        }
    
        $results = $this->getResourceTable()->updateViews($post->id);
    
        $response->setStatusCode(200);
    
        $response->setContent(Json::encode($results));
    
        return $response;
    }
    
}

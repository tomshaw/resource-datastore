<?php

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Paginator\Adapter\ArrayAdapter;
use Zend\Paginator\Paginator;
use Zend\View\Model\ViewModel;
use Zend\Json\Json;
use Zend\Session\Container;

use Application\Model\Resource as ResourceModel;

class ResourceController extends AbstractActionController
{  
    protected $authservice;
    
    protected $resourceTable;
    
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
    
    public function getSessionContainer()
    {
        return new Container('PointsGrid');
    }
    
    public function indexAction()
    {   
        $this->append();
        
        $parentId = (int) $this->params()->fromRoute('parent_id', false);
        
        $this->getSessionContainer()->parent_id = $parentId;
        
        $navigation = $this->getResourceTable()->getNavigation($parentId);
        
        $categories = $this->getResourceTable()->fetchCategories([]);
        
        $views = $this->getResourceTable()->getQueryForMostViews();

        $vm = new ViewModel();
        
        $vm->setVariable('categories', $categories);
        
        $vm->setVariables(array(
            'parent_id' => $parentId,
            'views' => $views,
            'navigation' => $navigation
        ));
        
        return $vm;
    }
    
    public function dataAction()
    {
        $response = $this->getResponse();
    
        $grid = $this->grid('Application\Index\Index', array('-','id','title','category','username','created_at','-'));
        
        if (isset($this->getSessionContainer()->parent_id)) {
            $grid['parent_id'] = $this->getSessionContainer()->parent_id;
        }
    
        $result = $this->getResourceTable()->fetchDataGrid($grid);
    
        $adapter = new ArrayAdapter($result);
    
        $paginator = new Paginator($adapter);
    
        $page = ceil(intval($grid['start']) / intval($grid['length'])) + 1;
    
        $paginator->setCurrentPageNumber($page);
    
        $paginator->setItemCountPerPage(intval($grid['length']));
    
        $data = array();
        $data['data'] = array();
    
        foreach ($paginator as $row) {
            
            $category = (array_key_exists('category', $row)) ? $row['category'] : '-';
            
            $title = ($row['node_type'] == \Application\Model\Resource::NODE_TYPE_CATEGORY) ? '<a href="/admin/resource/parent_id/' . $row['id'] . '" title="'.strip_tags($row['description']).'">' . strip_tags($row['title']) . '</a>' : '<i>' . strip_tags($row['title']) . '</i>';
            
            $actions = '';
            if ($row['url']) {
                $actions .= '<a class="btn btn-xs btn-outline blue-steel btn-view" href="' . $row['url'] . '" data-id="' . $row['id'] . '" target="_blank">View</a>&nbsp;';
            }
            $actions .= '<a class="btn btn-xs btn-outline red" href="/admin/resource/delete/id/' . $row['id'] . '" onclick="return confirm("Are you sure you wish to delete selected resources?");">Delete</a>';
            
            $data['data'][] = array(
                '<input type="checkbox" name="id['.$row['id'].']" value="'.$row['id'].'" />',
                '<a class="btn btn-xs btn-outline blue-steel btn-view" href="/admin/resource/edit/id/' . $row['id'] . '/parent_id/' . $row['parent_id'] . '" title="' . $row['id'] . '">Edit: ' . $row['id'] . '</a>',
                $title,
                $category,
                $row['username'],
                date('F jS Y', strtotime($row['created_at'])),
                $actions
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
    
    public function createAction()
    {   
        $parentId = (int) $this->params()->fromRoute('parent_id', false);
        
        $identity = $this->getAuthService()->getIdentity();
        
        $request = $this->getRequest();
        
        $errors = array();
        if ($request->isPost()) {
        
            $post = $this->purify($request->getPost());
            
            if (!$this->token()->validate()) {
                //$errors[] = 'Your request could not be completed.';
            }
             
            if (sizeof($errors)) {
                foreach($errors as $error) {
                    $this->flashmessenger()->addMessage($error);
                }
                return $this->redirect()->toRoute('admin-resource');
            }

            $data = $this->getResourceTable()->create($post->parent_id);
            
            if ($post->parent_id == 0) {
                $post->node_type = ResourceModel::NODE_TYPE_CATEGORY;
            }
    
            $now = new \Zend\Db\Sql\Expression('NOW()');
            $cur = new \Zend\Db\Sql\Expression('CURDATE()');
            
            $insert = array(
                'title' => $post->title,
                'description' => $post->description,
                'url' => $post->url,
                'node_type' => $post->node_type,
                'node_status' => $post->node_status,
                'parent_id' => $post->parent_id,
                'user_id' => $identity->id,
                'left_id' => $data['left_id'],
                'right_id' => $data['right_id'],
                'created_date' => $cur,
                'created_at' => $now,
                'updated_at' => $now
            );
            
            $lastInsertId = $this->getResourceTable()->add($insert);
            
            $this->activity($identity->username . ' created resource ' . $post->title, 'fa-check');
    
            $this->flashmessenger()->addMessage('Resource has been created successfully.');
            
            return $this->redirect()->toRoute('admin-resource-edit', array('id' => $lastInsertId, 'parent_id' => $post->parent_id));
        }
        
        $navigation = $this->getResourceTable()->getNavigation($parentId);
        
        $vm = new ViewModel();
        
        $vm->setVariable('token', $this->token()->create());
        
        $vm->setVariables(array(
            'parent_id' => $parentId,
            'types' => ResourceModel::getTypes(),
            'statuses' => ResourceModel::getStatuses(),
            'navigation' => $navigation
        ));
        
        return $vm;
    }
    
    public function editAction()
    {
        $id = (int) $this->params()->fromRoute('id', false);
        
        $parentId = (int) $this->params()->fromRoute('parent_id', false);
        
        $request = $this->getRequest();
        
        $errors = array();
        if ($request->isPost()) {
            
            $post = $this->purify($request->getPost());
            
            if (!$this->token()->validate()) {
                //$errors[] = 'Your request could not be completed.';
            }
            
            $row = $this->getResourceTable()->fetchRow(array('id'=>$post->id));
            if (!sizeof($row)) {
                $errors[] = 'Could not load resource.';
            }
            
            if ($row->node_type == ResourceModel::NODE_TYPE_CATEGORY && $post->node_type == ResourceModel::NODE_TYPE_RESOURCE) {
                if ($this->getResourceTable()->hasChildren($row)) {
                    $errors[] = 'Resource has children so node type cannot be changed.';
                }
            }
             
            if (sizeof($errors)) {
                foreach($errors as $error) {
                    $this->flashmessenger()->addMessage($error);
                }
                return $this->redirect()->toRoute('admin-resource');
            }
            
            if ($post->parent_id == 0) {
                $post->node_type = ResourceModel::NODE_TYPE_CATEGORY;
            }
            
            $update = array(
                'title' => $post->title,
                'description' => $post->description,
                'url' => $post->url,
                'node_type' => $post->node_type,
                'node_status' => $post->node_status,
                'updated_at' => new \Zend\Db\Sql\Expression('NOW()')
            );
            
            $this->getResourceTable()->update($post->id, $update);

            $this->tags()->process($post->id, $post->tags);
            
            $identity = $this->getAuthService()->getIdentity();
            
            $this->activity($identity->username . ' updated resource ' . $post->title, 'fa-globe');
            
            $this->flashmessenger()->addMessage('Resource has been updated successfully.');
            
            return $this->redirect()->toRoute('admin-resource-edit', array('id' => $post->id, 'parent_id' => $post->parent_id));
        }
        
        $resource = $this->getResourceTable()->fetchRow(array('id'=>$id));
        
        $tags = $this->tags()->fetchTags($id, true);
        
        $navigation = $this->getResourceTable()->getNavigation($parentId);
        
        $vm = new ViewModel();
        
        $vm->setVariable('token', $this->token()->create());
        
        $vm->setVariable('navigation', $navigation);
        
        $vm->setVariable('tags', $tags);
        
        $vm->setVariables(array(
            'id' => $id,
            'parent_id' => $parentId,
            'row' => $resource,
            'types' => ResourceModel::getTypes(),
            'statuses' => ResourceModel::getStatuses()
        ));
        
        return $vm;
    }
    
    public function deleteAction()
    {
        $id = (int) $this->params()->fromRoute('id', false);
        
        $identity = $this->getAuthService()->getIdentity();
    
        $request = $this->getRequest();
    
        $errors = array();
        if ($request->isPost()) {
    
            $post = $this->purify($request->getPost());
    
            if (!$this->token()->validate()) {
                //$errors[] = 'Your request could not be completed.';
            }
    
            $row = $this->getResourceTable()->fetchRow(array('id'=>$post->id));
            if (!sizeof($row)) {
                $errors[] = 'Could not load resource.';
            }
             
            if (sizeof($errors)) {
                foreach($errors as $error) {
                    $this->flashmessenger()->addMessage($error);
                }
                return $this->redirect()->toRoute('admin-resource');
            }
            
            $nodes = $this->getResourceTable()->getChildren($row, true);
            
            if (sizeof($nodes)) {
                foreach ($nodes as $node) {
                    $this->tags()->delete($node['id']);
                }
            }
            
            if (isset($post->children)) {
                $this->getResourceTable()->deleteBranch($id);
                $this->activity($identity->username . ' deleted branch ' . $row->title, 'fa-exclamation-triangle');
            } else {
                $this->getResourceTable()->deleteNode($id);
                $this->activity($identity->username . ' deleted node ' . $row->title, 'fa-exclamation-triangle');
            }
            
            $message = (isset($post->children)) ? 'Resource branch was successfully deleted' : 'Resource node was deleted successfully.';
    
            $this->flashmessenger()->addMessage($message);
    
            return $this->redirect()->toRoute('admin-resource', array('parent_id' => $row->parent_id));
        }
    
        $resource = $this->getResourceTable()->fetchRow(array('id'=>$id));
        
        $children = $this->getResourceTable()->hasChildren($resource);
    
        $navigation = $this->getResourceTable()->getNavigation($resource->parent_id);
    
        $vm = new ViewModel();
    
        $vm->setVariable('token', $this->token()->create());
    
        $vm->setVariable('navigation', $navigation);
    
        $vm->setVariables(array(
            'row' => $resource,
            'children' => $children,
            'types' => ResourceModel::getTypes()
        ));
    
        return $vm;
    }
    
    public function append()
    {
        $this->getServiceLocator()->get('viewhelpermanager')->get('InlineScript')
            ->appendFile('/acp/js/grids/datagrid.js')
            ->appendFile('/acp/js/grids/resource.js');
    }
    
}

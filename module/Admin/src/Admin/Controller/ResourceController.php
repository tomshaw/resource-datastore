<?php

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
//use Zend\Paginator\Adapter\ArrayAdapter;
//use Zend\Paginator\Paginator;
use Zend\View\Model\ViewModel;

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
    
    public function indexAction()
    {   
        $parentId = (int) $this->params()->fromRoute('parent_id', false);
        
        $rows = $this->getResourceTable()->getQueryForParent($parentId);
        
        $navigation = $this->getResourceTable()->getNavigation($parentId);
        
        $views = $this->getResourceTable()->getQueryForMostViews();
        
        $vm = new ViewModel();
        
        $vm->setVariables(array(
            'parent_id' => $parentId,
            'rows' => $rows,
            'views' => $views,
            'navigation' => $navigation
        ));
        
        return $vm;
    }
    
    public function createAction()
    {
        $parentId = (int) $this->params()->fromRoute('parent_id', false);
        
        $userId = $this->getAuthService()->getIdentity()->id;
        
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
            
            $insert = array(
                'title' => $post->title,
                'description' => $post->description,
                'url' => $post->url,
                'node_type' => $post->node_type,
                'node_status' => $post->node_status,
                'parent_id' => $post->parent_id,
                'user_id' => $userId,
                'left_id' => $data['left_id'],
                'right_id' => $data['right_id'],
                'created_at' => $now,
                'updated_at' => $now
            );
            
            $lastInsertId = $this->getResourceTable()->add($insert);
    
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
            } else {
                $this->getResourceTable()->deleteNode($id);
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
    
}

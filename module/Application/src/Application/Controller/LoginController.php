<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;

class LoginController extends AbstractActionController
{
    protected $storage;
    
    protected $authservice;
    
    protected $userTable;
    
    public function getAuthService()
    {
        if (!$this->authservice) {
            $this->authservice = $this->getServiceLocator()->get('AuthService');
        }
        return $this->authservice;
    }
    
    public function getSessionStorage()
    {
        if (!$this->storage) {
            $this->storage = $this->getServiceLocator()->get('AuthStorage');
        }
        return $this->storage;
    }
    
    public function getUserTable()
    {
        if (!$this->userTable) {
            $sm              = $this->getServiceLocator();
            $this->userTable = $sm->get('Application\Model\UserTable');
        }
        return $this->userTable;
    }
    
    public function getSessionContainer()
    {
        return new Container('Referer');
    }
    
    public function indexAction()
    {
        $request = $this->getRequest();
        
        if ($this->getAuthService()->hasIdentity()) {
            return $this->redirect()->toRoute('home');
        }
        
        if ($request->isPost()) {
            
            $post = $this->purify($request->getPost());
            
            $errors = array();
            if (empty($post->email)) {
                $errors[] = 'You must enter an email address.';
            }
            
            if (empty($post->password)) {
                $errors[] = 'You must enter a password.';
            }
            
            if (!$this->token()->validate()) {
                $errors[] = 'Your request could not be completed.';
            }
            
            if (sizeof($errors)) {
                $this->activity('Failed login attempt.', 'fa-user');
                $this->flashmessenger()->addMessage($errors[0]);
                return $this->redirect()->toRoute('login');
            }
            
            $authService = $this->getAuthService();
            
            $authAdapter = $authService->getAdapter();
            
            $authAdapter->setIdentity($post->email);
            
            $authAdapter->setCredential($post->password);
            
            $result = $authAdapter->authenticate();
            
            if (!$result->isValid()) {
                $this->flashmessenger()->addMessage('Could not validate your email and password.');
                $this->redirect()->toRoute('login');
                return;
            }
            
            $storage = $authService->getStorage();
            
            if (!empty($post->remember)) {
                $storage->setRememberMe(1, SESSION_LIFETIME);
            }
            
            $columnsToReturn = array('id','username','email','identity');
            
            $columnsToOmit = array('password');
            
            $columns = $authAdapter->getResultRowObject($columnsToReturn, $columnsToOmit);
            
            $storage->write($columns);
            
            $storage->lastLogin();
            
            $this->activity($columns->username . ' has logged in.', 'fa-user');

            $this->flashMessenger()->addMessage('You have successfully logged in!','success');
            
            if (!empty($post->redirect)) {
                $this->redirect()->toUrl($post->redirect);
            } else {
                $this->redirect()->toRoute('home');
            }
            
            return;
        }
        
        $vm = new ViewModel();
        
        $vm->setVariable('token', $this->token()->create());
        
        return $vm;
    }
    
    public function logoutAction()
    {
        $this->activity($this->getAuthService()->getIdentity()->username . ' has logged out.', 'fa-user');
        $this->getSessionStorage()->forgetMe();
        $this->getAuthService()->clearIdentity();
        $this->flashmessenger()->addMessage('Thank you for visiting!','success');
        return $this->redirect()->toRoute('home');
    }
        
}

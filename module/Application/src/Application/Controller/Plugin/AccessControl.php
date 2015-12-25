<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin, 
    Zend\Permissions\Acl\Acl, 
    Zend\Permissions\Acl\Role\GenericRole as Role, 
    Zend\Permissions\Acl\Resource\GenericResource as Resource, 
    Zend\View\Helper\Navigation\AbstractHelper as NavigationHelper;

//use Zend\Debug\Debug as Debug;
use Application\Model\AuthStorage;

class AccessControl extends AbstractPlugin
{    
    /**
     * A container for the event manager.
     *
     * @var object
     */
    protected $event = null;
    
    /**
     * A container for the service manager.
     *
     * @var object
     */
    protected $serviceManager = null;
    
    /**
     * A container for the authentication store.
     *
     * @var object
     */
    protected $storage = null;
    
    /**
     * A container for the current user role.
     *
     * @var string
     */
    protected $role = null;
    
    /**
     * A container for the Zend_Acl object.
     *
     * @var object
     */
    protected $acl = null;
    
    /**
     * Container for controlling cycles.
     *
     * @var mixed bool|null
     */
    private $hasRun = false;
    
    /**
     * User level roles.
     * 
     * @var constant
     */
    const ACLROLE_ANONYMOUS                 = 0;
    const ACLROLE_MEMBER                    = 1;
    const ACLROLE_MODERATOR                 = 2;
    const ACLROLE_SUPERVISOR                = 3;
    const ACLROLE_ADMINISTRATOR             = 4;
    
    /**
     * Returns array of user levels.
     */
    public static function getRoles()
    {
        return array(
            self::ACLROLE_ANONYMOUS => 'Anonymous',
            self::ACLROLE_MEMBER => 'Member',
            self::ACLROLE_MODERATOR => 'Moderator',
            self::ACLROLE_SUPERVISOR => 'Supervisor',
            self::ACLROLE_ADMINISTRATOR => 'Administrator'
        );
    }
    
    private function getStorage()
    {
        if (null === $this->storage) {
            $storage       = new AuthStorage('Zend_Auth');
            $this->storage = $storage->read();
        }
        return $this->storage;
    }
    
    public function setEvent($e)
    {
        $this->event = $e;
    }
    
    public function getEvent()
    {
        return $this->event;
    }
    
    public function getServiceManager()
    {
        if (is_null($this->serviceManager)) {
            $this->serviceManager = $this->getEvent()->getApplication()->getServiceManager();
        }
        return $this->serviceManager;
    }
    
    public function getAcl()
    {
        if (null === $this->acl) {
            $this->acl = new Acl();
        }
        return $this->acl;
    }
    
    public function getIdentity()
    {
        $service = $this->getServiceManager()->get('AuthService');
        if ($service->hasIdentity()) {
            return $service->getIdentity()->identity;
        }
        return false;
    }
    
    public function getRole()
    {
        $roles = $this->getRoles();
        if (isset($roles[$this->getIdentity()])) {
            return $roles[$this->getIdentity()];
        }
        throw new \RuntimeException("Role: " . $this->getIdentity() . " not found.");
    }
    
    public function initialize($e)
    {
        /**
         * Try to avoid object recycle.
         */
        if (true === ($this->getHasRun())) {
            return;
        }
        
        /**
         * Assigns service manager property.
         */
        $this->setEvent($e);
        
        /**
         * Defines and creates Access Control List Roles.
         */
        $this->roles();
        
        /**
         * Defines and creates Access Control List Resources.
         */
        $this->resources();
        
        /**
         * Defines and creates Access Control List Access Permissions.
         */
        $this->control();
        
        /**
         * Implements Zend_Navigation helper components.
         */
        $this->navigationHelper();
        
        /**
         * Checks access to resources based on defined privileges.
         */
        $this->has();
        
        /**
         * Set hasRun to true.
         */
        $this->setHasRun(true);
    }
    
    /**
     * Sets the _hasRun variable to true. Used to control object cycles.
     */
    private function setHasRun($bool)
    {
        $this->hasRun = $bool;
    }
    
    /**
     * Returns the hasRun instance.
     * @return bool true/false
     */
    private function getHasRun()
    {
        return $this->hasRun;
    }
    
    /**
     * Assign generic system wide roles.
     */
    protected function roles()
    {
        $this->getAcl()->addRole(new Role('anonymous'));
        $this->getAcl()->addRole(new Role('member'), 'anonymous');
        $this->getAcl()->addRole(new Role('moderator'), 'member');
        $this->getAcl()->addRole(new Role('supervisor'), 'moderator');
        $this->getAcl()->addRole(new Role('administrator'), 'supervisor');
    }
    
    /**
     * Defines generic system wide resources.
     */
    protected function resources()
    {
        $this->getAcl()->addResource(new Resource('Application'));
        $this->getAcl()->addResource(new Resource('Login'));
        $this->getAcl()->addResource(new Resource('Admin'));
    }
    
    /**
     * Defines access controls based on the generic roles and resources previously defined.
     */
    protected function control()
    {
        $this->getAcl()->allow('anonymous', 'Application');
        $this->getAcl()->deny('anonymous', 'Admin');
        
        $this->getAcl()->allow('administrator');
    }
    
    /**
     * Implements Zend_Navigation helper components.
     */
    protected function navigationHelper()
    {
        NavigationHelper::setDefaultAcl($this->getAcl());
        NavigationHelper::setDefaultRole($this->getRole());
    }
    
    /**
     * Checks access controls based on the allow dent permission hash.
     */
    protected function has()
    {
        $e = $this->getEvent();
        
        $controller      = $e->getTarget();
        $controllerClass = get_class($controller);
        $namespace       = substr($controllerClass, 0, strpos($controllerClass, '\\'));
        
        $role = strtolower($this->getRole());
        if (!$this->getAcl()->isAllowed($role, $namespace, 'view')) {
             
            $response = $e->getResponse();
            
            $response->setStatusCode(302);

            $response->getHeaders()->addHeaderLine('Location', $e->getRouter()->assemble(array(), array('name' => 'login')));
            
            $e->stopPropagation();
        }
    }
    
    /**
     * Uses the specified required roles parameter to determine if the current logged in user
     * has access to the specified system resources. This method is to be used to control access to
     * system resources outside of the module/controller/action logic that Zend Acl provides.
     * Returns true if the current role is in the requirement array false otherwise.
     *
     * @todo retest.
     * @param array $requiredRoles
     * @return bool true if user passes test false otherwise.
     */
    public function hasAllowedRole($requiredRoles = array())
    {
        if (!is_array($requiredRoles)) {
            throw new \InvalidArgumentException('$requiredRoles parameter must be an array.');
        }
        // Checks to see if all of the supplied roles are registered.
        foreach ($requiredRoles as $_index => $role) {
            $this->getRole($role);
        }
        
        $currentRole = $this->getRole();
        if (in_array($currentRole, array_values($requiredRoles))) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Find the users role name/value in the static roles array.
     *
     * @todo retest.
     * @param int $identity
     * @return static|boolean
     */
    public function getRoleByIdentity($identity)
    {
        $roles = $this->getRoles();
        
        $keys = array_keys($roles);
        if (isset($roles[$keys[$identity]])) {
            return $roles[$keys[$identity]];
        }
        
        return false;
    }
    
    /**
     * Returns the key number based on the role provided.
     *
     * @todo retest.
     * @param string $role
     * @throws Exception
     * @return mixed integer the array key of the role.
     */
    public function getKeyByRole($role)
    {
        try {
            $this->getRole($role);
        } catch (\Exception $e) {
            throw new \Exception('Could not find role ' . $role . '.');
        }
        
        return array_search($role, array_keys($this->getRoles()));
    }
}

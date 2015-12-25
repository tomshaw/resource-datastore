<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class Tags extends AbstractPlugin
{
    protected $serviceLocator;
    
    protected $tagTable;
    
    protected $tagResourceTable;
    
    public function setServiceLocator($serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
    }
    
    protected function getServiceLocator()
    {
        return $this->serviceLocator;
    }
    
    public function getTagTable()
    {
        if (!$this->tagTable) {
            $sm = $this->getServiceLocator();
            $this->tagTable = $sm->get('Application\Model\TagTable');
        }
        return $this->tagTable;
    }
    
    public function getTagResourceTable()
    {
        if (!$this->tagResourceTable) {
            $sm = $this->getServiceLocator();
            $this->tagResourceTable = $sm->get('Application\Model\TagResourceTable');
        }
        return $this->tagResourceTable;
    }
    
    public function fetchTags($resourceId, $stringify = false)
    {
        $rows = $this->getTagResourceTable()->fetchTags($resourceId);
        
        if (sizeof($rows) && !is_null($rows) && $stringify == true) {
            return implode(',', array_keys($rows));
        }
        
        return $rows;
    }
    
    public function process($resourceId, $tags = null)
    {
        if (is_null($tags)) {
            return;
        }
        
        if (sizeof($tagArray = explode(',', $tags)) == false) {
            return;
        }
        
        $tagTable = $this->getTagTable();
        
        for ($i = 0; $i < count($tagArray); $i++) {
            
            $name = $tagArray[$i];
            
            $result = $tagTable->fetchRow(array('name'=>$name));
            
            $now = new \Zend\Db\Sql\Expression('NOW()');
            
            if ($result === false) {
                $tagTable->add(array(
                    'name' => $name,
                    'created' => $now
                ));
            }            
        }
        
        $tagResourceTable = $this->getTagResourceTable();
        
        $tagResourceTable->delete(array('resource_id'=>$resourceId));
        
        for ($i = 0; $i < count($tagArray); $i++) {
        
            $name = $tagArray[$i];
        
            $result = $tagTable->fetchRow(array('name'=>$name));
        
            if ($result !== false) {
                $tagResourceTable->add(array(
                    'tag_id' => $result->id,
                    'resource_id' => $resourceId
                ));
            }
        }
    }
    
    public function delete($resourceId)
    {
        return $this->getTagResourceTable()->delete(array('resource_id'=>$resourceId));
    }


    protected function dump($var, $message = '')
    {
        return \Zend\Debug\Debug::dump($var, $message);
    }

}

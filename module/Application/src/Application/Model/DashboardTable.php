<?php

namespace Application\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
//use Zend\Db\Sql\Where;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Predicate;
//use Zend\Db\Sql\Expression;
//use Zend\Db\ResultSet\ResultSet;

use Application\Model\Resource as ResourceModel;

/**
 * @todo top cats, resources
 */
class DashboardTable {
    
    protected $tableGateway;
    
    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }
    
    public function getAdapter()
    {
        return $this->tableGateway->getAdapter();
    }
    
    public function fetchCountResources($nodeType = ResourceModel::NODE_TYPE_CATEGORY)
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()
            ->from('resource')
            ->columns(array(new Predicate\Expression('COUNT(id) AS count')));
    
        $select->where->equalTo('node_type', $nodeType);

        $statement = $sql->prepareStatementForSqlObject($select);
    
        return $statement->execute()->current()['count'];
    }
    
    public function fetchTotalViews()
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()
            ->from('resource')
            ->columns(array(new Predicate\Expression('SUM(views) AS total')));
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        return $statement->execute()->current()['total'];
    }
    
    public function fetchTotalTags()
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()
            ->from('tag')
            ->columns(array(new Predicate\Expression('COUNT(id) AS count')));
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        return $statement->execute()->current()['count'];
    }
    
    public function fetchTopTags()
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        
        $select = $sql->select()
            ->from(array('tag_resource' => 'tag_resource'))
            ->columns(array(new Predicate\Expression('COUNT(tag_resource.tag_id) AS count')))
            ->join(array('tag' => 'tag'), 'tag.id = tag_resource.tag_id', array('name'))
            ->group('tag_resource.tag_id')
            ->order('count DESC')
            ->limit(10);
        
        $statement = $sql->prepareStatementForSqlObject($select);
        
        return iterator_to_array($statement->execute());
    }
   
    protected function dump($var, $message = '')
    {
        return \Zend\Debug\Debug::dump($var, $message);
    }
    
}

<?php

namespace Application\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;

class TagResourceTable
{
    protected $tableGateway;
    
    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }
    
    public function getAdapter()
    {
        return $this->tableGateway->getAdapter();
    }
    
    public function fetch($where = array())
    {
        $rows = $this->tableGateway->select($where);
        if (!$rows->count()) {
            return false;
        }
        return $rows;
    }
    
    public function fetchRow($where = array())
    {
        $rowset = $this->tableGateway->select($where);
        $row = $rowset->current();
        if (!$row) {
            return false;
        }
    
        return $row;
    }
    
    public function add($data)
    {
        try {
            $this->tableGateway->insert($data);
        } catch(\Exception $e) {
            return false;
        }
    
        return $this->tableGateway->lastInsertValue;
    }
    
    public function update($id, $data)
    {
        try {
            $this->tableGateway->update($data, array('id' => $id));
        } catch(\Exception $e) {
            return false;
        }
        return true;
    }
    
    public function delete($where = array())
    {
        try {
            $this->tableGateway->delete($where);
        } catch(\Exception $e) {
            return false;
        }
        return true;
    }
    
    public function fetchTags($resourceId)
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()->from(array('tag_resource' => 'tag_resource'))->columns(array('*'));
        
        $select->join(array('tag' => 'tag'), 'tag.id = tag_resource.tag_id', array('name'), Select::JOIN_INNER);
        
        $select->where->equalTo('tag_resource.resource_id', intval($resourceId));
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        $rows = iterator_to_array($statement->execute());
        
        $data = array();
        foreach ($rows as $row) {
            $data[$row['name']] = $row['name'];
        }
        
        return sizeof($data) ? $data : null;
    }
    
    protected function dump($var, $message = '')
    {
        return \Zend\Debug\Debug::dump($var, $message);
    }
}

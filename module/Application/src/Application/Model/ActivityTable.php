<?php

namespace Application\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Expression;
use Zend\Db\Sql\Predicate;

class ActivityTable
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
    
    public function fetchLatest()
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()
            ->from(array('activity' => 'activity'))
            ->columns(array('*'));
    
        $select->order('activity.id DESC');
    
        $select->limit(10);
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        return iterator_to_array($statement->execute());
    }
   
}

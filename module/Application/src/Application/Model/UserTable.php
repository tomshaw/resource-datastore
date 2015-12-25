<?php

namespace Application\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;

class UserTable
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
    
    public function fetchGrid($data = array())
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()->from(array('user' => 'user'))->columns(array('*'));
    
        if (isset($data['id_from']) && !empty($data['id_from']) && isset($data['id_to']) && !empty($data['id_to'])) {
            $select->where->greaterThanOrEqualTo('user.id', $data['id_from']);
            $select->where->lessThanOrEqualTo('user.id', $data['id_to']);
        } else if (isset($data['id_from']) && !empty($data['id_from'])) {
            $select->where->greaterThanOrEqualTo('user.id', $data['id_from']);
        } else if (isset($data['id_to']) && !empty($data['id_to'])) {
            $select->where->lessThanOrEqualTo('user.id', $data['id_to']);
        }
    
        if (isset($data['fullname']) && !empty($data['fullname'])) {
            $select->where->literal('LOWER(user.first_name) LIKE "%'.strtolower($data['fullname']).'%"')->or->literal('LOWER(user.last_name) LIKE "%'.strtolower($data['fullname']).'%"');
        }
    
        if (isset($data['email']) && !empty($data['email'])) {
            $select->where->literal('LOWER(user.email) LIKE "%'.strtolower($data['email']).'%"');
        }
    
        if (isset($data['identity']) && !empty($data['identity']) && intval($data['identity']) > 0) {
            $select->where->equalTo('user.identity', intval($data['identity']));
        }
    
        if (isset($data['verified']) && !empty($data['verified']) && intval($data['verified']) > 0) {
            $select->where->equalTo('user.verified', intval($data['verified'])-1);
        }
    
        if (isset($data['created_from']) && !empty($data['created_from']) && isset($data['created_to']) && !empty($data['created_to'])) {
            $select->where->greaterThanOrEqualTo('user.created_at', $data['created_from']);
            $select->where->lessThanOrEqualTo('user.created_at', $data['created_to'] . ' 11:59:59');
        } else if (isset($data['created_from']) && !empty($data['created_from'])) {
            $select->where->greaterThanOrEqualTo('user.created_at', $data['created_from']);
        } else if (isset($data['created_to']) && !empty($data['created_to'])) {
            $select->where->lessThanOrEqualTo('user.created_at', $data['created_to']);
        }
    
        $select->order(array($data['order'] . ' ' . strtoupper($data['sort'])));
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        return iterator_to_array($statement->execute());
    }
    
}

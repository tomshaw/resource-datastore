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
            return $e;
        }
        return true;
    }
    
    public function fetchDataGrid($data = array())
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()
            ->from(array('activity' => 'activity'))
            ->columns(array('*', new Predicate\Expression('DATE_FORMAT(activity.created_at, "%b %d, %Y") AS created_at'), new Predicate\Expression('SUBSTRING_INDEX(activity.text, ".", 1) AS teaser')))
            ->join(array('user' => 'user'), 'user.id = activity.user_id', array('username'), Select::JOIN_INNER);
    
        if (isset($data['id_from']) && !empty($data['id_from']) && isset($data['id_to']) && !empty($data['id_to'])) {
            $select->where->greaterThanOrEqualTo('activity.id', $data['id_from']);
            $select->where->lessThanOrEqualTo('activity.id', $data['id_to']);
        } else if (isset($data['id_from']) && !empty($data['id_from'])) {
            $select->where->greaterThanOrEqualTo('activity.id', $data['id_from']);
        } else if (isset($data['id_to']) && !empty($data['id_to'])) {
            $select->where->lessThanOrEqualTo('activity.id', $data['id_to']);
        }
    
        if (isset($data['text']) && !empty($data['text'])) {
            $select->where->literal('LOWER(activity.text) LIKE "%'.strtolower($data['text']).'%"');
        }
    
        if (isset($data['created_from']) && !empty($data['created_from']) && isset($data['created_to']) && !empty($data['created_to'])) {
            $select->where->greaterThanOrEqualTo('activity.created_at', $data['created_from']);
            $select->where->lessThanOrEqualTo('activity.created_at', $data['created_to'] . ' 11:59:59');
        } else if (isset($data['created_from']) && !empty($data['created_from'])) {
            $select->where->greaterThanOrEqualTo('activity.created_at', $data['created_from']);
        } else if (isset($data['created_to']) && !empty($data['created_to'])) {
            $select->where->lessThanOrEqualTo('activity.created_at', $data['created_to']);
        }
    
        $select->order(array($data['order'] . ' ' . strtoupper($data['sort'])));
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        return iterator_to_array($statement->execute());
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

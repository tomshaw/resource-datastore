<?php

namespace Application\Model;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Predicate;
use Zend\Db\Sql\Expression;

use Application\Model\Resource as ResourceModel;

class ResourceTable
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

    public function fetchAll()
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        $select = $sql->select()->from('resource')->columns(array('*'));
        return $this->tableGateway->selectWith($select);
    }

    public function fetch($where = array())
    {
        $rows = $this->tableGateway->select($where);
        if (! $rows->count()) {
            return false;
        }
        return $rows;
    }

    public function fetchRow($where = array())
    {
        $rowset = $this->tableGateway->select($where);
        $row = $rowset->current();
        if (! $row) {
            return false;
        }
        return $row;
    }

    public function add($data)
    {
        try {
            $this->tableGateway->insert($data);
        } catch (\Exception $e) {
            return false;
        }
        
        return $this->tableGateway->lastInsertValue;
    }

    public function update($id, $data)
    {
        try {
            $this->tableGateway->update($data, array('id' => $id));
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    public function delete($where = array())
    {
        try {
            $this->tableGateway->delete($where);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    public function fetchCategories($data = array())
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        
        $select = $sql->select()->from(array('resource' => 'resource'))->columns(array('id','title'));
        
        $select->where->equalTo('resource.parent_id', 0);
        
        $select->where->or->equalTo('resource.node_type', ResourceModel::NODE_TYPE_CATEGORY);
        
        $select->order('resource.title ASC');
        
        $statement = $sql->prepareStatementForSqlObject($select);
        
        $array = iterator_to_array($statement->execute());
        
        $data = array();
        if (sizeof($array)) {
            foreach ($array as $row) {
                $data[$row['id']] = $row;
            }
        }
        
        return $data;
    }
    
    /**
     * Terminal string.
     * 
     * SELECT CONCAT(REPEAT(' - ', (COUNT(parent.title) - 1)), node.title) AS name FROM resource AS node, resource AS parent WHERE node.left_id BETWEEN parent.left_id AND parent.right_id GROUP BY node.title ORDER BY node.left_id;
     */
    public function fetchIndented()
    {
        $sql = "SELECT CONCAT(REPEAT(' - ', (COUNT(parent.title) - 1)), node.title) AS name
                FROM resource AS node, resource AS parent
                WHERE node.left_id BETWEEN parent.left_id AND parent.right_id
                GROUP BY node.title
                ORDER BY node.left_id";
        $resultSet = $this->getAdapter()->query($sql, \Zend\Db\Adapter\Adapter::QUERY_MODE_EXECUTE); 
        return $resultSet->toArray(); 
    }

    public function fetchResources($data = array())
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        
        $select = $sql->select()
            ->from(array('resource' => 'resource'))
            ->columns(array('*',new Predicate\Expression('DATE_FORMAT(resource.created_at, "%b %d, %Y") AS created_at'),new Predicate\Expression('SUBSTRING_INDEX(resource.description, ".", 1) AS teaser')))
            ->join(array('user' => 'user'), 'user.id = resource.user_id', array('username'), Select::JOIN_INNER)
            ->join(array('resource2' => 'resource'), 'resource.parent_id = resource2.id', array('category'=>'title'), Select::JOIN_INNER);
        
        $select->where->notEqualTo('resource.parent_id', 0);
        
        $select->where->notEqualTo('resource.node_type', ResourceModel::NODE_TYPE_CATEGORY);
        
        if (isset($data['id_from']) && !empty($data['id_from']) && isset($data['id_to']) && !empty($data['id_to'])) {
            $select->where->greaterThanOrEqualTo('resource.id', $data['id_from']);
            $select->where->lessThanOrEqualTo('resource.id', $data['id_to']);
        } else if (isset($data['id_from']) && !empty($data['id_from'])) {
            $select->where->greaterThanOrEqualTo('resource.id', $data['id_from']);
        } else if (isset($data['id_to']) && !empty($data['id_to'])) {
            $select->where->lessThanOrEqualTo('resource.id', $data['id_to']);
        }
        
        if (isset($data['title']) && !empty($data['title'])) {
            $select->where->literal('LOWER(resource.title) LIKE "%'.strtolower($data['title']).'%"')->or->literal('LOWER(resource.description) LIKE "%'.strtolower($data['title']).'%"');
        }
        
        if (array_key_exists('category', $data) && !empty($data['category'])) {
            if (is_array($data['category'])) {
                $select->where->in('resource.parent_id', $data['category']);
            } else {
                $select->where->equalTo('resource.parent_id', intval($data['category']));
            }
        }
        
        if (isset($data['created_from']) && !empty($data['created_from']) && isset($data['created_to']) && !empty($data['created_to'])) {
            $select->where->greaterThanOrEqualTo('resource.created_at', $data['created_from']);
            $select->where->lessThanOrEqualTo('resource.created_at', $data['created_to'] . ' 11:59:59');
        } else if (isset($data['created_from']) && !empty($data['created_from'])) {
            $select->where->greaterThanOrEqualTo('resource.created_at', $data['created_from']);
        } else if (isset($data['created_to']) && !empty($data['created_to'])) {
            $select->where->lessThanOrEqualTo('resource.created_at', $data['created_to']);
        }
        
        $select->order(array($data['order'] . ' ' . strtoupper($data['sort'])));
        
        $statement = $sql->prepareStatementForSqlObject($select);
        
        return iterator_to_array($statement->execute());
    }

    public function getQueryForParent($parentId)
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        
        $select = $sql->select()
            ->from(array('resource' => 'resource'))
            ->columns(array('*',new Predicate\Expression('DATE_FORMAT(resource.created_at, "%b %d, %Y") AS created')))
            ->join(array('user' => 'user'), 'user.id = resource.user_id', array('username'), Select::JOIN_INNER);
        
        $select->where->equalTo('resource.parent_id', intval($parentId));
        
        $select->order('resource.node_type ASC');
        
        $statement = $sql->prepareStatementForSqlObject($select);
        
        return iterator_to_array($statement->execute());
    }
    
    public function getQueryForMostViews()
    {
        $sql = new Sql($this->tableGateway->getAdapter());
    
        $select = $sql->select()
            ->from(array('resource' => 'resource'))
            ->columns(array('*',new Predicate\Expression('DATE_FORMAT(resource.created_at, "%b %d, %Y") AS created')));
        
        $select->where->notEqualTo('resource.views', false);
    
        $select->order('resource.views DESC');
        
        $select->limit(20);
    
        $statement = $sql->prepareStatementForSqlObject($select);
    
        return iterator_to_array($statement->execute());
    }

    public function getNavigation($parentId)
    {
        if (!$parentId) {
            return array();
        }
        
        $row = $this->fetchRow(array('id' => $parentId));
        
        if (!sizeof($row)) {
            return array();
        }
        
        $parents = $this->getParents($row, true);
        
        return (sizeof($parents)) ? $parents : array();
    }
    
    public function hasChildren($row)
    {
        return (sizeof($row = $this->getChildren($row))) ? $row : false;
    }
    
    public function hasParents($row)
    {
        return (sizeof($row = $this->getParents($row))) ? $row : false;
    }

    public function getParents($row, $target = false)
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        
        $select = $sql->select()
            ->from(array('resource' => 'resource'))
            ->columns(array('*'));
        
        if ($target) {
            $select->where->greaterThanOrEqualTo('resource.right_id', intval($row->right_id));
            $select->where->lessThanOrEqualTo('resource.left_id', intval($row->left_id));
        } else {
            $select->where->greaterThan('resource.right_id', intval($row->right_id));
            $select->where->lessThan('resource.left_id', intval($row->left_id));
        }
        
        $statement = $sql->prepareStatementForSqlObject($select);
        
        return iterator_to_array($statement->execute());
    }

    public function getChildren($row, $target = false)
    {
        $sql = new Sql($this->tableGateway->getAdapter());
        
        $select = $sql->select()
            ->from(array('resource' => 'resource'))
            ->columns(array('*'));
        
        if ($target) {
            $select->where->lessThanOrEqualTo('resource.right_id', intval($row->right_id));
            $select->where->greaterThanOrEqualTo('resource.left_id', intval($row->left_id));
        } else {
            $select->where->lessThan('resource.right_id', intval($row->right_id));
            $select->where->greaterThan('resource.left_id', intval($row->left_id));
        }
        
        $statement = $sql->prepareStatementForSqlObject($select);
        
        return iterator_to_array($statement->execute());
    }

    public function create($parentId)
    {
        return ($parentId) ? $this->createSubEntry($parentId) : $this->createRootEntry();
    }
    
    protected function createRootEntry()
    {
        $select = $this->tableGateway->getSql()->select();
    
        $select->columns(array('right_id' => new Expression('MAX(right_id)')));
    
        $select->where(array());
    
        $rowset = $this->tableGateway->selectWith($select);
    
        $row = $rowset->current();
    
        $row->right_id = (is_null($row->right_id)) ? 0 : intval($row->right_id);
    
        return array(
            'left_id' => $row->right_id + 1,
            'right_id' => $row->right_id + 2
        );
    }

    protected function createSubEntry($parentId)
    {
        $row = $this->fetchRow(array('id' => $parentId));
        
        $sql = new Sql($this->getAdapter());
        
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('right_id' => new Expression('right_id + 2')));
        $update->where->greaterThanOrEqualTo('right_id', $row->right_id);
        
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
        $result->getAffectedRows();
        
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('left_id' => new Expression('left_id + 2')));
        $update->where->greaterThan('left_id', $row->right_id);
        
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
        $result->getAffectedRows();
        
        return array(
            'left_id' => $row->right_id,
            'right_id' => $row->right_id + 1
        );
    }
    
    /**
     * Deletes a single node.
     */
    public function deleteNode($id)
    {
        if (!sizeof($row = $this->fetchRow(array('id' => $id)))) {
            return false;
        }
    
        if (sizeof($this->getChildren($row))) {
            return false;
        }
    
        $sql = new Sql($this->getAdapter());
    
        $delete = $sql->delete('resource');
        $delete->where->equalTo('id', $row->id);
        $statement = $sql->prepareStatementForSqlObject($delete);
        $result = $statement->execute();
        $result->getAffectedRows();

        $update = $sql->update();
        $update->table('resource');
        $update->set(array('left_id' => new Expression("left_id - 1")));
        $update->set(array('right_id' => new Expression("right_id - 1")));
        $update->where->between('left_id', $row->left_id, $row->right_id);    
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
        $result->getAffectedRows();
    
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('left_id' => new Expression("left_id - 2")));
        $update->where->greaterThan('left_id', $row->right_id);    
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
        
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('right_id' => new Expression("right_id - 2")));
        $update->where->greaterThan('right_id', $row->right_id);
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
    
        return $result->getAffectedRows();
    }

    /**
     * Deletes a node plus it's children.
     */
    public function deleteBranch($id)
    {
        if (!sizeof($row = $this->fetchRow(array('id' => $id)))) {
            return false;
        }
        
        $sql = new Sql($this->getAdapter());
        
        $delete = $sql->delete('resource');
        $delete->where->between('left_id', $row->left_id, $row->right_id);
        $statement = $sql->prepareStatementForSqlObject($delete);
        $result = $statement->execute();
        $result->getAffectedRows();
        
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('left_id' => new Expression("left_id - ROUND(" . $row->right_id . " - " . $row->left_id . " + 1)")));
        $update->where->greaterThan('left_id', $row->right_id);
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();     
        $result->getAffectedRows();
        
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('right_id' => new Expression("right_id - ROUND(" . $row->right_id . " - " . $row->left_id . " + 1)")));
        $update->where->greaterThan('right_id', $row->right_id);
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
        $result->getAffectedRows();
        
        return true;
    }
    
    public function updateViews($resourceId)
    {
        $sql = new Sql($this->getAdapter());
        
        $update = $sql->update();
        $update->table('resource');
        $update->set(array('views' => new Expression("views + 1")));
        $update->where->equalTo('id', $resourceId);
        $statement = $sql->prepareStatementForSqlObject($update);
        $result = $statement->execute();
        return $result->getAffectedRows();
    }

    protected function dump($var, $message = '')
    {
        return \Zend\Debug\Debug::dump($var, $message);
    }
}

<?

namespace Task\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Sql;

class TaskRepository implements TaskRepositoryInterface//,RoleServiceAwareInterface
{
    const TABLE_NAME = "task";

    /**
     * Our database adapter
     */
    protected $db;
    /**
     * Role service
     */
    protected $roleService;

    public function __construct(Adapter $adapter)
    {
        $this->db = $adapter;
    }

    /**
     * {@inheritDoc}
     */
    public function findAllTasks($resources = array())
    {
        if ($resources[0] == "default"){
            $resources = array($this->roleService->getUserRole());
        }
        /**
         * Prepare an SQL statement
         */
        $sql    = new Sql($this->db);
        $select = $sql->select(self::TABLE_NAME);
        $select->where->in("calendar", $resources);
        $select->where(array("isActive" => 1));
        $stmt   = $sql->prepareStatementForSqlObject($select);
        $result = $stmt->execute();
        /**
         * Convert into a collection of Task Objects
         */
        $resultSet = new ResultSet();
        $resultSet->setArrayObjectPrototype(new Task());
        $resultSet->initialize($result);
        /**
         * Return the collection
         */
        return $result;
    }

    /**
     * {@inheritDoc}
     */
    public function findTask($id)
    {
        $sql    = new Sql($this->db);
        $select = $sql->select(self::TABLE_NAME);
        $select->where(array("id"=>$id));
        $stmt   = $sql->prepareStatementForSqlObject($select);
        $result = $stmt->execute();
        /**
         * Convert into a collection of Task Objects
         */
        $resultSet = new ResultSet();
        $resultSet->setArrayObjectPrototype(new Task());
        $resultSet->initialize($result);
        return $resultSet->current();
    }

    public function insert(Task $task)
    {
        $task->setDateAdded(time())
             ->setDateUpdated(time());
        /**
         * Prepare an SQL statement
         */
        $sql = new Sql($this->db);
        /**
         * Define the statement parameters
         */
        $insert = $sql->insert(self::TABLE_NAME);
        $newData = $task->toArray();
        $insert->values($newData);
        /**
         * Create the statement
         */
        $insertString = $sql->getSqlStringForSqlObject($insert);
        /**
         * Save and get the auto generated ID,
         * setting it back in our object
         */
        $response = $this->db->query($insertString, Adapter::QUERY_MODE_EXECUTE);
        $task->setId($response->getGeneratedValue());

        return $task;
    }

    public function update(Task $task)
    {
        if (strpos($task->getId(), "-")){
            return $this->saveRecurringException($task);
        }

        $task->setDateUpdated(time());
        /**
         * Prepare an SQL statement
         */
        $sql    = new Sql( $this->db );
        /**
         * Unset the id because we donnot want to update it
         */
        $newData = $task->toArray();
        unset($newData['id']);
        unset($newData['dateAdded']);
        /**
         * Define the statement parameters
         */
        $update = $sql->update();
        $update->table(self::TABLE_NAME);
        $update->set( $newData );
        $update->where( array( 'id' => $task->getId() ) );
        /**
         * Execute the statement
         */
        $statement  = $sql->prepareStatementForSqlObject( $update );//var_dump($statement);die();
        $statement->execute();
        return $task;
    }

    public function saveRecurringException(Task $task){
        $id = explode(".", $task->getId());//?
        $recurringTask = $this->findTask($id);

        $recurringTask->setRecurrenceException($task->getExceptions()/*$exception*/);
        $this->update($recurringTask);

        return $this->insert($task->setId(null));
    }

    public function delete($id){
        $task = $this->findTask($id);
        $task->setIsActive(false);
        $this->update($task);
    }

    public function setRoleService($roleService){
        $this->roleService = $roleService;
    }
}
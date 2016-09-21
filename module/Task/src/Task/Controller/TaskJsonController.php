<?

namespace Task\Controller;

use Task\Model\Task;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class TaskJsonController extends AbstractRestfulController
{
    protected $repository;

    /**
     * Return list of resources
     *
     * @return mixed
     */
    public function getList()
    {
        $params = $this->getRequest()->getQuery("resources");
        $resources =  explode(",",$params);

        $tasks = $this->getRepository()->findAllTasks($resources);
        $return = array();
        foreach($tasks as $task){
            $task["subject"] = $task["calendar"] . " - " . $task["subject"];
            $return[] = $task;
        }

        return new JsonModel($return);

    }

    /**
     * Create a new resource
     *
     * @param  mixed $data
     * @return mixed
     */
    public function create($data)
    {
        /**
        * Create a new task and set
        * its values as in the
        * request parameters
        */
        $task = new Task();
        $task->exchangeArray($data);
        /**
         * Call the repository to
         * save our object
         */
        $task = $this->getRepository()->insert($task);
        /**
        * Return the object as JSON
        */
        return new JsonModel($task->toArray());
    }

    /**
     * Update an existing resource
     *
     * @param  mixed $id
     * @param  mixed $data
     * @return mixed
     */
    public function update($id, $data)
    {
        /**
         * Create a new task and set
         * its values as in the
         * request parameters
         */
        $task = new Task();
        $task->exchangeArray($data);

        $task->setId($id);
        /**
         * Call the repository to
         * save our object
         */
        $task = $this->getRepository()->update($task);
        /**
         * Return the object as JSON
         */
        return new JsonModel($task->toArray());
    }

    /**
     * Delete an existing resource
     *
     * @param  mixed $id
     * @return mixed
     */
    public function delete($id)
    {
        $this->response->setStatusCode(405);

        return array(
            'content' => 'Method Not Allowed'
        );
    }

    public function getRepository(){
        if (null == $this->repository)
        {
            $this->repository = $this->getServiceLocator()->get("task_repository");
        }

        return $this->repository;
    }
}
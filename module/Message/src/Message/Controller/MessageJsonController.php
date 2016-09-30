<?

namespace Message\Controller;

use Message\Model\DTMessage;
use Message\Model\Message;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class MessageJsonController extends AbstractRestfulController
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

        $tasks = $this->getRepository()->findTask($resources);
//        $return = array();
//        foreach($tasks as $task){
////            $task["subject"] = $task["calendar"] . " - " . $task["subject"];
//            $return[] = $task;
//        }

        return new JsonModel($tasks);

    }

    /**
     * Create a new resource
     *
     * @param  mixed $data
     * @return mixed
     */
    public function create($data)
    {
        $dtm = new DTMessage((object)$data);
        $this->getServiceLocator()->get("message_service")->storeMessageToDB($dtm);
        /**
         * Return the object as JSON
         */
        return new JsonModel($dtm->toArray());
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
            $this->repository = $this->getServiceLocator()->get("message_repository");
        }

        return $this->repository;
    }
}
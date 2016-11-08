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
     * Get list of all resources
     *
     * @param $folderParameter
     * @return JsonModel
     */
    public function getList()
    {
        $resources = $this->getRequest()->getQuery();

        $MessagesInfo = $this->getServiceLocator()->get("message_service")->getMessagesInfoFromDB($resources);

        return new JsonModel($MessagesInfo);

    }

    /**
     * Create a new resource
     *
     * @param mixed $data
     * @return JsonModel
     */
    public function create($data)
    {
        $dtm = new DTMessage();
        $dtm->setValuesFromDataArray((object)$data);

        $this->getServiceLocator()->get("message_service")->storeMessageToDB($dtm);
        /**
         * Return the object as JSON
         */
        return new JsonModel($dtm->toArray());
    }

    /**
     * Get a single resource
     *
     * @param $id
     * @return JsonModel
     */
    public function get($id){
        $msgBody = $this->getServiceLocator()->get("message_service")->getMessageFromDB($id);
        return new JsonModel($msgBody);
    }

    /**
     * @return JsonModel
     */
    /*public function newMessagesAction()
    {
        $resources = $this->getRequest()->getQuery();

        $MessagesInfo = $this->getServiceLocator()->get("message_service")->getMessagesInfoFromDB($resources);

        return new JsonModel($MessagesInfo);
    }*/

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
        $resources = $this->getRequest()->getQuery();
        $deletion = $resources['delete'];
        $box = $resources['box'];

        if($deletion == "false"){
            //change isDeleted
            $this->getServiceLocator()->get("message_service")->deleteMessageForUser($id,$box);
        }
        else{
            //delete from DB

        }
        return new JsonModel();
    }

    public function getRepository(){
        if (null == $this->repository)
        {
            $this->repository = $this->getServiceLocator()->get("message_repository");
        }

        return $this->repository;
    }
}
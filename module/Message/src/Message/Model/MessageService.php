<?

namespace Message\Model;

class MessageService
{
    protected $messageRepository;
    protected $messageCorrelationRepository;
    protected $identity;

    public function __construct(){

    }


    /**
     * @param mixed $messageRepository
     */
    public function setMessageRepository($messageRepository)
    {
        $this->messageRepository = $messageRepository;
    }

    /**
     * @param mixed $messageCorrelationRepository
     */
    public function setMessageCorrelationRepository($messageCorrelationRepository)
    {
        $this->messageCorrelationRepository = $messageCorrelationRepository;
    }

    public function setIdentity($identity)
    {
        $this->identity = $identity;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMessageRepository()
    {
        return $this->messageRepository;
    }

    /**
     * @return mixed
     */
    public function getMessageCorrelationRepository()
    {
        return $this->messageCorrelationRepository;
    }

    /**
     * Storing a message to the database
     * One message entry and N correlation entries for the N receivers of the message
     * Able to rollback on both tables, in case of error
     * @param $DTMessage
     */
    public function storeMessageToDB($DTMessage){
        \DB::transaction(function ($qb) use ($DTMessage) {
            try {
                /* adding message to DB */
                $DTMessage->getMsg()->setSenderOffice($this->identity->getRole());
                $DTMessage->getMsg()->setSenderUser($this->identity->getUsername());
                $this->getMessageRepository()->insert($DTMessage->getMsg(), $qb);
//                var_dump($this->identity->getRole());
//                die();


                /* adding correlation to DB for every receiver */
                $receiversArray = array();
                foreach($DTMessage->getOffices() as $office){
                    $messageCorrelation = new MessageCorrelation();
                    $messageCorrelation->setMsgId($DTMessage->getMsg()->getId());
                    $messageCorrelation->setOffice($office);
                    $messageCorrelation->setRegarding($DTMessage->getRegarding());
                    $messageCorrelation->setState("Inbox");
                    $messageCorrelation->setIsSent($DTMessage->getMsg()->getIsSent());
                    $messageCorrelation->setIsDeleted($DTMessage->isIsDeleted());
                    $messageCorrelation->setIsRead($DTMessage->isIsRead());
                    $messageCorrelation = $messageCorrelation->toArray();
                    unset($messageCorrelation['id']);
                    array_push($receiversArray, $messageCorrelation);
                }

                $this->getMessageCorrelationRepository()->insert($receiversArray, $qb);
                $qb->commit();
            } catch (\PDOException $e) {
                var_dump($e);
                $qb->rollBack();
            }
        });

    }

    /**
     * Retrieving a message & its messageCorrelations from DB
     * @param $messageId
     * @return DTMessage
     */
    public function getMessageFromDB($messageId){

        $message = new Message($this->getMessageRepository()->findMessage($messageId));
        $allMessageCorrelations = $this->getMessageCorrelationRepository()->findMessageCorrelation($messageId);

        $allOffices = array();
        foreach ($allMessageCorrelations as $messageCorrelation){
            array_push($allOffices, $messageCorrelation->office);
        }

        $dtm = new DTMessage();
        $dtm->setMsg($message);
        $dtm->setOffices($allOffices);
        $dtm->setRegarding($messageCorrelation->first()->regarding);
        $dtm->setIsRead(true);  // since user viewed the message, it is now "read"

        return $dtm;
    }

    /**
     * Requested messages returned, according to given parameters
     *
     * @param $resources
     * @return mixed
     */
    public function getRequestedMessagesFromDB($resources){
        $folderParameter = $resources[0];
        switch($folderParameter){
            case 'inbox':
                // inbox
                $messageIds = $this->getMessageCorrelationRepository()->findMessageIds($this->identity->getRole());
                return $this->getMessageRepository()->findOutboxMessages($messageIds);
            case 'outbox':
                // outbox
                return $this->getMessageRepository()->findOutboxMessages($this->identity->getRole());
            case 'draft':
                // draft
                return $this->getMessageRepository()->findDraftMessages($this->identity->getRole());
                break;
            default:

        }
    }

}
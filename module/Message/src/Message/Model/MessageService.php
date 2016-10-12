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
                var_dump($receiversArray);
                $this->getMessageCorrelationRepository()->insert($receiversArray, $qb);
                $qb->commit();
            } catch (\PDOException $e) {
                var_dump($e);
                $qb->rollBack();
            }
        });

    }

    public function getUnreadMessagesFromDB($resources)
    {
        $messages = null;
        $count = $this->getMessageCorrelationRepository()->getUnreadMessages($this->identity->getRole());
        if ($resources['count'] != $count)
        {
            $messages = $this->getRequestedMessagesFromDB($resources);
        }
        $data[] = array(
            'source' => $messages,
            'count' => $count
        );
        return $data;
    }

    /**
     * Retrieving a message & its messageCorrelations from DB
     * @param $messageId
     * @return MsgBody
     */
    public function getMessageFromDB($messageId){

        $body = $this->getMessageRepository()->getMessage($messageId);

        $this->getMessageCorrelationRepository()->updateMessageSendState($this->identity->getRole(),$messageId);
        return $body;
    }

    /**
     * Requested messages returned, according to given parameters
     *
     * @param $resources
     * @return mixed
     */
    public function getRequestedMessagesFromDB($resources){
        $folderParameter = $resources['box'];
        switch($folderParameter){
            case 'inbox':
                // inbox
                $messageIds = $this->getMessageCorrelationRepository()
                    ->findMessageIds($this->identity->getRole());
                $ids = array();

                foreach ($messageIds as $messageId) {
                    array_push($ids,$messageId->msg_id);
                }

                $messagesList = $this->getMessageRepository()->findInboxMessages($ids, $this->identity->getRole(), $resources['pagenum'], $resources['pagesize']);

                $total_rows = $this->getMessageCorrelationRepository()->getTotalInbox($this->identity->getRole());

                $data[] = array(
                    'TotalRows' => $total_rows,
                    'Rows' => $messagesList
                );
                return $data;
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
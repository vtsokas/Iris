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
        //var_dump($DTMessage);
        \DB::transaction(function ($qb) use ($DTMessage) {
            try {
                /* adding message to DB */
                $DTMessage->getMsg()->setSenderOffice($this->identity->getRole());
                $DTMessage->getMsg()->setSenderUser($this->identity->getUsername());
                $this->getMessageRepository()->insert($DTMessage->getMsg(), $qb);

                /* adding correlation to DB for every receiver */
                $receiversArray = array();
                //var_dump($DTMessage->getOffices());
                if (is_array($DTMessage->getOffices())){
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
                    //var_dump($receiversArray);
                    $this->getMessageCorrelationRepository()->insert($receiversArray, $qb);
                }

                $qb->commit();
            } catch (\PDOException $e) {
                var_dump($e);
                $qb->rollBack();
            }
        });

    }

    public function getMessagesInfoFromDB($resources)
    {
        $folderParameter = $resources['box'];
        $data = array(
            'TotalRows' => 0,
            'Rows' => Array(),
            'unreadMessages' => 0
        );
        switch($folderParameter){
            case 'inbox':
                // inbox
                $data['unreadMessages'] = $this->getMessageCorrelationRepository()->getUnreadMessages($this->identity->getRole());

                if ($resources['caller'] == 'interval') //call made by interval
                {
                    if (($resources['count'] != $data['unreadMessages']) && ($resources['caller'] == 'inbox')) //check if client unread messages are equal with server
                    {
                        $this->getInboxMessagesFromDB($resources, $data); //if not get messages
                    }
                }
                else //call made by user
                {
                    $this->getInboxMessagesFromDB($resources, $data);
                }
                return $data;
            default:
                // outbox
                $data['Rows'] = $this->getMessageRepository()->getOutboxOrDraftMessages($this->identity->getRole(),
                    $this->identity->getUsername(), $resources['pagenum'], $resources['pagesize'], $resources['send']);
                $data['TotalRows'] = $this->getMessageRepository()->getTotalOutboxOrDrafts($this->identity->getRole(),
                    $this->identity->getUsername(), $resources['send']);
                return $data;
        }
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
    public function getInboxMessagesFromDB($resources, &$data){

        $messageIds = $this->getMessageCorrelationRepository()
            ->findMessageIds($this->identity->getRole());
        $ids = array();

        foreach ($messageIds as $messageId) {
            array_push($ids,$messageId->msg_id);
        }

        if (!empty($ids)){
            $data['Rows'] = $this->getMessageRepository()->getInboxMessages($ids, $this->identity->getRole(), $resources['pagenum'], $resources['pagesize']);
            $data['TotalRows'] = $this->getMessageCorrelationRepository()->getTotalInbox($this->identity->getRole());
        }
    }
}
<?

namespace Message\Model;

class MessageService
{
    protected $messageRepository;
    protected $messageCorrelationRepository;


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

    public function storeMessageToDB($DTMessage){
        /* adding message to DB */
        var_dump($DTMessage);
        $this->getMessageRepository()->insert($DTMessage->getMsg());

        /* adding correlation to DB for sender*/
/*
        $messageCorrelation = new MessageCorrelation();
        $messageCorrelation->setMsgId($DTMessage->getMsg()->getId());
        $messageCorrelation->setOffice($DTMessage->getMsg()->getSender());
        $messageCorrelation->setRegarding($DTMessage->getRegarding());
        $messageCorrelation->setState("Outbox");
        $messageCorrelation->setIsSent($DTMessage->getMsg()->getIsSent());
        $messageCorrelation->setIsDeleted($DTMessage->isIsDeleted());
        $messageCorrelation->setIsRead($DTMessage->isIsRead());

        $this->getMessageCorrelationRepository()->insert($messageCorrelation);
*/

        /* adding correlation to DB for every receiver */
        foreach($DTMessage->getOffices() as $office){
            $messageCorrelation = new MessageCorrelation();
            $messageCorrelation->setMsgId($DTMessage->getMsg()->getId());
            $messageCorrelation->setOffice($office);
            $messageCorrelation->setRegarding($DTMessage->getRegarding());
            $messageCorrelation->setState("Inbox");
            $messageCorrelation->setIsSent($DTMessage->getMsg()->getIsSent());
            $messageCorrelation->setIsDeleted($DTMessage->isIsDeleted());
            $messageCorrelation->setIsRead($DTMessage->isIsRead());

            $this->getMessageCorrelationRepository()->insert($messageCorrelation);
        }

    }
}
<?

namespace Message\Model;

class MessageService
{
    protected $messageRepository;
    protected $messageCorrelationRepository;
    protected $userRole;

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

    public function setUserRole($userRole)
    {
        $this->userRole = $userRole;
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

    public function storeMessageToDB($DTMessage){
        \DB::transaction(function ($qb) use ($DTMessage) {
            try {
                /* adding message to DB */
                $DTMessage->getMsg()->setSender($this->userRole);
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

                $this->getMessageCorrelationRepository()->insert($receiversArray, $qb);
                $qb->commit();
            } catch (\PDOException $e) {
                $qb->rollBack();
            }
        });

    }
}
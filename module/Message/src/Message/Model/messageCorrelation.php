<?

namespace Message\Model;

use Application\Model\AbstractObject;

class MessageCorrelation extends AbstractObject{

    /**
     * @var id
     */
    protected $id;

    /**
     * @var msgId
     */
    protected $msgId;

    /**
     * @var office
     */
    protected $office;

    /**
     * @var regarding
     */
    protected $regarding;

    /**
     * @var state
     */
    protected $state;

    /**
     * @var isSent
     */
    protected $isSent;

    /**
     * @var isRead
     */
    protected $isRead;

    /**
     * @var isDeleted
     */
    protected $isDeleted;

    /**
     * MessageCorrelation constructor.
     */
    public function __construct()
    {

    }

    public function getMessageCorrelationDataArray(){
        return $this->toArray();
    }

    /**
     * @return msgId
     */
    public function getmsgId()
    {
        return $this->msgId;
    }

    /**
     * @return office
     */
    public function getOffice()
    {
        return $this->office;
    }

    /**
     * @return regarding
     */
    public function getRegarding()
    {
        return $this->regarding;
    }

    /**
     * @return state
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @return isSent
     */
    public function getIsSent()
    {
        return $this->isSent;
    }

    /**
     * @return isRead
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    /**
     * @return isDeleted
     */
    public function getIsDeleted()
    {
        return $this->isDeleted;
    }

    /**
     * @param userId $userID
     */
    /*public function setUserID($userID)
    {
        $this->userID = $userID;
    }*/

    /**
     * @param isSent $isSent
     */
    public function setIsSent($isSent)
    {
        $this->isSent = $isSent;
    }

    /**
     * @param isRead $isRead
     */
    public function setIsRead($isRead)
    {
        $this->isRead = $isRead;
    }

    /**
     * @param isDeleted $isDeleted
     */
    public function setIsDeleted($isDeleted)
    {
        $this->isDeleted = $isDeleted;
    }

    /**
     * @param office $office
     */
    public function setOffice($office)
    {
        $this->office = $office;
    }

    /**
     * @param regarding $regarding
     */
    public function setRegarding($regarding)
    {
        $this->regarding = $regarding;
    }

    /**
     * @param msgId $msgId
     */
    public function setMsgId($msgId)
    {
        $this->msgId = $msgId;
    }

    /**
     * @param state $state
     */
    public function setState($state)
    {
        $this->state = $state;
    }

}


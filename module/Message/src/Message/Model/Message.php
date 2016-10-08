<?

namespace Message\Model;

use Application\Model\AbstractObject;

class Message extends AbstractObject
{
    protected $id;
    protected $sender_office;
    protected $sender_user;
    protected $subject;
    protected $msgBody;
    protected $type;
    protected $dateAdded;
    protected $isDeleted;
    protected $isSent;


    public function __construct($dataArray)
    {
        unset($dataArray['sender']); //TODO correct data input from ajax call
        $this->exchangeArray($dataArray);
    }

    public function getMessageDataArray(){
        return $this->toArray();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id=$id;
        return $this;
    }

    public function getSenderOffice()
    {
        return $this->sender_office;
    }

    public function setSenderOffice($senderOffice)
    {
        $this->sender_office = $senderOffice;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSenderUser()
    {
        return $this->sender_user;
    }

    /**
     * @param mixed $senderUser
     */
    public function setSenderUser($senderUser)
    {
        $this->sender_user = $senderUser;
    }

    public function getSubject()
    {
        return $this->subject;
    }

    public function getMsgBody()
    {
        return $this->msgBody;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getDateAdded()
    {
        return $this->dateAdded;
    }

    public function setDateAdded($dateAdded)
    {
        $this->dateAdded= $dateAdded;
        return $this;
    }

    public function getIsDeleted()
    {
        return $this->isDeleted;
    }

    public function getIsSent()
    {
        return $this->isSent;
    }

}
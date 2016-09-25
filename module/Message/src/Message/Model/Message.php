<?

namespace Message\Model;

use Application\Model\AbstractObject;

class Message extends AbstractObject
{
    protected $id;
    protected $sender;
    protected $subject;
    protected $msgBody;
    protected $type;
    protected $dateAdded;
    protected $isDeleted;
    protected $isSent;

    public function __construct()
    {

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

    public function getSender()
    {
        return $this->sender;
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
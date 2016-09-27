<?

namespace Message\Model;

use Application\Model\AbstractObject;

class DTMessage extends AbstractObject
{
    protected $msg;
    protected $offices;
    protected $regarding;
    protected $isRead;
    protected $isDeleted;

    /**
     * DTMessage constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->msg =  new Message($data->message);
        $this->offices = $data->offices;
        $this->regarding = $data->regarding;
        $this->isRead = false;
        $this->isDeleted = false;
    }


    public function getDTMessageDataArray(){
        return $this->toArray();
    }

    /**
     * @return Message
     */
    public function getMsg()
    {
        return $this->msg;
    }

    /**
     * @return array[string]
     */
    public function getOffices()
    {
        return $this->offices;
    }

    /**
     * @return string
     */
    public function getRegarding()
    {
        return $this->regarding;
    }

    /**
     * @return boolean
     */
    public function isIsRead()
    {
        return $this->isRead;
    }

    /**
     * @return boolean
     */
    public function isIsDeleted()
    {
        return $this->isDeleted;
    }
}
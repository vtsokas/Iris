<?

namespace Message\Model;

use Application\Model\AbstractObject;
use Zend\Db\Sql\Ddl\Column\Varbinary;

class DTMessage extends AbstractObject
{
    protected $msg;
    protected $offices = "";
    protected $regarding;
    protected $isRead;
    protected $isDeleted;

    /**
     * DTMessage constructor.
     */
    public function __construct()
    {
        $this->isRead = false;
        $this->isDeleted = false;
    }

    /**
     * Sets all dtmessage values from a data array, possibly obtained from a DB query
     * @param $data
     */
    public function setValuesFromDataArray($data){
        $this->msg =  new Message($data->message);
        $this->offices = $data->offices;
        $this->regarding = $data->regarding;
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
     * @param mixed $msg
     */
    public function setMsg($msg)
    {
        $this->msg = $msg;
    }

    /**
     * @return array[string]
     */
    public function getOffices()
    {
        return $this->offices;
    }

    /**
     * @param mixed $offices
     */
    public function setOffices($offices)
    {
        $this->offices = $offices;
    }

    /**
     * @return string
     */
    public function getRegarding()
    {
        return $this->regarding;
    }

    /**
     * @param mixed $regarding
     */
    public function setRegarding($regarding)
    {
        $this->regarding = $regarding;
    }

    /**
     * @return boolean
     */
    public function isIsRead()
    {
        return $this->isRead;
    }

    /**
     * @param boolean $isRead
     */
    public function setIsRead($isRead)
    {
        $this->isRead = $isRead;
    }

    /**
     * @return boolean
     */
    public function isIsDeleted()
    {
        return $this->isDeleted;
    }

    /**
     * @param boolean $isDeleted
     */
    public function setIsDeleted($isDeleted)
    {
        $this->isDeleted = $isDeleted;
    }
}
<?

namespace Task\Model;

use Application\Model\AbstractObject;

class Task extends AbstractObject
{
    /**
     * @var int
     */
//    private $id;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $location;

    /**
     * @var string
     */
    protected $subject;

    /**
     * @var string
     */
    protected $calendar;

    /**
     * @var int
     */
    protected $from;

    /**
     * @var int
     */
    protected $to;

    /**
     * @var string
     */
    protected $recurrenceRule;

    /**
     * @var string
     */
    protected $recurrenceException;

    /**
     * @var string
     */
    protected $status;

    /**
     * @var int
     */
    protected $dateAdded;

    /**
     * @var int
     */
    protected $dateUpdated;

    /**
     * BUG SOLVER
     */
    protected $exceptions;

    protected $isActive = 1;

    /**
     * @param int|null $id
     * @param string $description
     * @param string $location
     * @param string $subject
     * @param string $calendar
     * @param int $from
     * @param int $to
     * @param string $recurrenceRule
     * @param string $recurrenceException
     */
    public function __construct(/*$id=null, $description=null, $location=null, $subject=null, $calendar=null,
                                $from=null, $to=null, $recurrenceRule=null, $recurrenceException=null*/)
    {
//        $this->setId($id);
//        $this->description = $description;
//        $this->location = $location;
//        $this->subject = $subject;
//        $this->calendar = $calendar;
//        $this->from = $from;
//        $this->to = $to;
//        $this->recurrenceRule = $recurrenceRule;
//        $this->recurrenceException = $recurrenceException;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @return string
     */
    public function getSubject()
    {
        return $this->subject;
    }

    public function setSubject($sub)
    {
        $this->subject = $sub;
        return $this;
    }

    /**
     * @return string
     */
    public function getCalendar()
    {
        return $this->calendar;
    }

    /**
     * @return int
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * @return int
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * @return string
     */
    public function getRecurrenceRule()
    {
        return $this->recurrenceRule;
    }

    /**
     * @return string
     */
    public function getRecurrenceException()
    {
        return $this->recurrenceException;
    }

    public function setRecurrenceException($recurrenceException)
    {
        $this->recurrenceException = $recurrenceException;
        return $this;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return int
     */
    public function getDateAdded()
    {
        return $this->dateAdded;
    }

    public function setDateAdded($dateAdded){
        $this->dateAdded = $dateAdded;
        return $this;
    }

    /**
     * @return int
     */
    public function getDateUpdated()
    {
        return $this->dateAdded;
    }

    public function setDateUpdated($dateUpdated)
    {
        $this->dateUpdated = $dateUpdated;
        return $this;
    }

    public function getExceptions()
    {
        return $this->exceptions;
    }

    public function getIsActive()
    {
        return $this->isActive;
    }

    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;
        return $this;
    }

    public function toArray()
    {
        $array = parent::toArray();
        unset($array["exceptions"]);
        return $array;
    }
}
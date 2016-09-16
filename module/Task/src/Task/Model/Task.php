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
     * @var string
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
     * @var string
     */
    protected $resource;

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
    public function __construct($id=null, $description=null, $location=null, $subject=null, $calendar=null,
                                $from=null, $to=null, $recurrenceRule=null, $recurrenceException=null)
    {
        $this->setId($id);
        $this->description = $description;
        $this->location = $location;
        $this->subject = $subject;
        $this->calendar = $calendar;
        $this->from = $from;
        $this->to = $to;
        $this->recurrenceRule = $recurrenceRule;
        $this->recurrenceException = $recurrenceException;
    }

    /**
     * @return int|null
     */
//    public function getId()
//    {
//        return $this->id;
//    }

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

    public function setSubject($sub){ $this->subject = $sub; return $this; }

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

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return string
     */
    public function getResource()
    {
        return $this->resource;
    }
}
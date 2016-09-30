<?

namespace Message\Model;


class MessageRepository
{
    //const TABLE_NAME = "task";

    public function __construct()
    {

    }

    /**
     * {@inheritDoc}
     */
    public function findAllTasks($resources = array())
    {
    }

    /**
     * {@inheritDoc}
     */
    public function findTask($id)
    {
        $query = \MyAlias::table('task')->where('subject', '=', 'afaf');
        //var_dump($query->get());
    }

    public function insert($message, $qb)
    {
        $message->setDateAdded(time());
        $data = $message->toArray();
        unset($data['id']);
        $message->setId($qb->table('message')->insert($data));
        return $message;
    }

    public function update(Task $task)
    {

    }
}
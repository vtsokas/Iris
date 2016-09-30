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
    public function findMessage($id)
    {
        return DB::table('message'); // TODO GET where id = $id (one result)
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
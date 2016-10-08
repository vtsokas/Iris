<?

namespace Message\Model;


class MessageRepository
{
    const TABLE_NAME = "message";

    public function __construct()
    {

    }


    /**
     * Finds all inbox messages for user based on their id
     *
     * @param $messageIds
     * @return mixed
     */
    public function findInboxMessages($messageIds)
    {
        return \DB::table(self::TABLE_NAME)
            ->select('sender_office', 'sender_user', 'subject', 'type', 'date')
            ->whereIn('msg_id', $messageIds);
    }

    /**
     * Finds all messages
     *
     * @param $userRole
     * @return mixed
     */
    public function findOutboxMessages($userRole)
    {
        return \DB::table(self::TABLE_NAME)
            ->select('message_correlation.office',self::TABLE_NAME.'.subject',self::TABLE_NAME.'.type'
                        ,self::TABLE_NAME.'.date')
            ->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('sender_office',$userRole)
            ->where(self::TABLE_NAME.'.isDeleted', false)
            ->where(self::TABLE_NAME.'.isSent', true);
    }

    public function findDraftMessages($userRole)
    {
        return \DB::table(self::TABLE_NAME)
            ->select('subject','type','date')
            ->where('sender_office',$userRole)
            ->where('isDeleted', false)
            ->where('isSent', false);
    }

    /**
     * {@inheritDoc}
     */
    public function findMessage($id)
    {
        return \DB::table('message')->find($id);
    }

    public function insert($message, $qb)
    {
        $message->setDateAdded(time());
        $data = $message->toArray();
        unset($data['id']);
        var_dump($data);
        $message->setId($qb->table('message')->insert($data));
        return $message;
    }

    public function update(Message $message)
    {

    }
}
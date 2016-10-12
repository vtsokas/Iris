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
    public function findInboxMessages($messageIds, $userRole, $pagenum, $pagesize)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->select('message.msg_id', 'subject', 'type', 'isRead', 'dateAdded')
            ->select(\DB::raw('CONCAT_WS(" - ", message.sender_office, message.sender_user) AS sender'))
            ->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('message_correlation.office', '=', $userRole)
            ->whereIn(self::TABLE_NAME.'.msg_id', $messageIds)
            ->offset($pagenum * $pagesize)
            ->limit($pagesize)
            ->orderBy('dateAdded', 'DESC');
        $result = $query->get();
        return $result;
    }

    /**
     * Finds all outbox messages
     *
     * @param $userRole
     * @return mixed
     */
    public function findOutboxMessages($userRole)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->select('message_correlation.office', 'message_correlation.regarding',self::TABLE_NAME.'.subject',self::TABLE_NAME.'.type'
                ,self::TABLE_NAME.'.dateAdded')
            ->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('sender_office',$userRole)
            ->where(self::TABLE_NAME.'.isDeleted', false)
            ->where(self::TABLE_NAME.'.isSent', true);
        $result = $query->get();

        return $result;
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
    public function getMessage($id)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->select('msgBody')
            ->where('msg_id',$id);
        $result = $query->get();
        return $result;
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
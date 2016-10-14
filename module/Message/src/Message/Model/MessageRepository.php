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
    public function getInboxMessages($messageIds, $userRole, $pagenum, $pagesize)
    {


        $query = \DB::table(self::TABLE_NAME)
            ->select('message.msg_id', 'subject', 'type', 'isRead', 'dateAdded')
            ->select(\DB::raw('CONCAT_WS(" - ", message.sender_office, message.sender_user) AS sender'))
            ->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('message_correlation.office', '=', $userRole)
            ->whereIn(self::TABLE_NAME.'.msg_id', $messageIds)
            ->orderBy('dateAdded', 'DESC')
            ->offset($pagenum * $pagesize)
            ->limit($pagesize);
        $result = $query->get();
        return $result;
    }

    /**
     * Finds all outbox messages
     *
     * @param $userRole
     * @return mixed
     */
    public function getOutboxOrDraftMessages($userRole, $userName, $pagenum, $pagesize, $flag)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->select('message.msg_id','type','subject','dateAdded')
            ->select(\DB::raw('message_correlation.msg_id, GROUP_CONCAT(DISTINCT office) AS receiver'))
            ->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('sender_office',$userRole)
            ->where('sender_user',$userName)
            ->where(self::TABLE_NAME.'.isDeleted', false)
            ->where(self::TABLE_NAME.'.isSent', $flag)
            ->groupBy('message_correlation.msg_id')
            ->orderBy('dateAdded', 'DESC')
            ->offset($pagenum * $pagesize)
            ->limit($pagesize);
        $result = $query->get();
        return $result;
    }

    public function getDraftMessages($userRole, $userName, $pagenum, $pagesize)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->select('subject','type','date')
            ->where('sender_office',$userRole)
            ->where('sender_user',$userName)
            ->where('isDeleted', false)
            ->where('isSent', false)
            ->orderBy('dateAdded', 'DESC')
            ->offset($pagenum * $pagesize)
            ->limit($pagesize);
        $result = $query->get();
        return $result;
    }

    public function getTotalOutboxOrDrafts($userRole, $userName, $flag)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->where('sender_office', $userRole)
            ->where('sender_user',$userName)
            ->where('isDeleted', false)
            ->where('isSent', $flag);
        $result = $query->count();

        return $result;
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
        $message->setId($qb->table('message')->insert($data));
        return $message;
    }

    public function update(Message $message)
    {

    }
}
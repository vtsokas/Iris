<?

namespace Message\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Sql;

class MessageCorrelationRepository
{
    const TABLE_NAME = "message_correlation";

    public function findMessageCorrelation($msgId)
    {
        return \DB::table(self::TABLE_NAME)->find($msgId, 'msg_id');
    }

    /**
     * Gets the ids of all messages correlations regarding the user
     *
     * @param $userRole
     * @return mixed
     */
    public function findMessageIds($userRole)
    {
       $query = \DB::table(self::TABLE_NAME)
           ->select('msg_id')
           ->where('office', $userRole)
           ->where('isDeleted', false)
           ->where('isSent', true);
        $result = $query->get();

        return $result;
    }

    public function getTotalInbox($userRole)
    {
        $query = \DB::table(self::TABLE_NAME)->where('office', $userRole);
        $result = $query->count();

        return $result;
    }

    public function getUnreadMessages($userRole)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->where('office', $userRole)
            ->where('isRead', false);
        $result = $query->count();

        return $result;
    }

    public function insert($receiversArray, $qb)
    {
        /* Batch insert normally returns an array of the inserted Ids */
        $insertIds = $qb->table(self::TABLE_NAME)->insert($receiversArray);
        //return $insertIds;
    }

    public function updateMessageSendState($userRole, $id)
    {
        $data = array(
            'isRead' => true
        );

        \DB::table(self::TABLE_NAME)
            ->where('msg_id', $id)
            ->where('office',$userRole)
            ->update($data);
    }
}

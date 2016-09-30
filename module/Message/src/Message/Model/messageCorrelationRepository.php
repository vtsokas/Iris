<?

namespace Message\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Sql;

class MessageCorrelationRepository
{
    const TABLE_NAME = "message_correlation";

    public function insert($receiversArray, $qb)
    {
        /* Batch insert normally returns an array of the inserted Ids */
        $insertIds = $qb->table(self::TABLE_NAME)->insert($receiversArray);
        //return $insertIds;
    }

}
